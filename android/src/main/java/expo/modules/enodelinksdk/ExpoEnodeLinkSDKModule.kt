package expo.modules.enodelinksdk

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.interfaces.permissions.PermissionsStatus
import expo.modules.core.errors.ModuleNotFoundException
import io.enode.link.LinkKit
import android.content.Intent;
import android.app.Activity;
import android.Manifest
import android.os.Build
import android.Manifest.permission.BLUETOOTH
import android.Manifest.permission.BLUETOOTH_SCAN
import android.Manifest.permission.BLUETOOTH_CONNECT
import android.Manifest.permission.ACCESS_FINE_LOCATION


private const val LINK_UI_REQUEST_CODE = 99
private const val ON_RESULT_EVENT_NAME = "OnResult"

class ExpoEnodeLinkSDKModule : Module() {
  private val activity
    get() = requireNotNull(appContext.activityProvider?.currentActivity)
   
  override fun definition() = ModuleDefinition {
    Name("ExpoEnodeLinkSDK")

    Events(ON_RESULT_EVENT_NAME)

    Function("show") { token: String ->
      val permissions = appContext.permissions ?: throw ModuleNotFoundException("Permissions")

      val requiredPermissions = if(Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
        listOf(
          BLUETOOTH,
          ACCESS_FINE_LOCATION,
        )
      } else {
        listOf(
          ACCESS_FINE_LOCATION,
          BLUETOOTH_SCAN,
          BLUETOOTH_CONNECT
        )
      }

      permissions.askForPermissions(
        { permissionsResponse ->
          val permissionsNotAllowed = requiredPermissions.any { permissionsResponse[it]?.status != PermissionsStatus.GRANTED  }
          if (permissionsNotAllowed) {
            sendEvent(ON_RESULT_EVENT_NAME, mapOf(
              "code" to "permissionError",
              "errorMessage" to "One or more of the required permissions are missing or not granted (${requiredPermissions.joinToString(",")})"
              )
            )
          } else {
            val intent = Intent(activity, LinkKit::class.java).apply {
              putExtra(LinkKit.INTENT_LINK_TOKEN, token);
            }
            activity.startActivityForResult(intent, LINK_UI_REQUEST_CODE, null)
          }
        },
        *requiredPermissions.toTypedArray()
      )
    }

    OnActivityResult { _, (requestCode, resultCode, intent) ->
      if (requestCode == LINK_UI_REQUEST_CODE) {
        if (resultCode == Activity.RESULT_OK) {
          sendEvent(ON_RESULT_EVENT_NAME, mapOf("code" to "success"))
        } else {
          sendEvent(ON_RESULT_EVENT_NAME, mapOf(
            "code" to (intent?.getStringExtra(LinkKit.ERROR_CODE) ?: "unknownError"),
            "errorMessage" to intent?.getStringExtra(LinkKit.ERROR_DETAILS)
            )
          )
        }
      }
    }
  }
}
