package expo.modules.enodelinksdk

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import io.enode.link.LinkKit
import android.content.Intent;
import android.app.Activity;


private const val LINK_UI_REQUEST_CODE = 99
private const val ON_RESULT_EVENT_NAME = "OnResult"

class ExpoEnodeLinkSDKModule : Module() {
  private val activity
    get() = requireNotNull(appContext.activityProvider?.currentActivity)
   
  override fun definition() = ModuleDefinition {
    Name("ExpoEnodeLinkSDK")

    Events(ON_RESULT_EVENT_NAME)

    Function("show") { token: String ->
       val intent = Intent(activity, LinkKit::class.java).apply {
        putExtra(LinkKit.INTENT_LINK_TOKEN, token);
      }
      activity.startActivityForResult(intent, LINK_UI_REQUEST_CODE, null)
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
