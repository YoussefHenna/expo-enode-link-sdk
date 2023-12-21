import ExpoModulesCore
import LinkKit

public class ExpoEnodeLinkSDKModule: Module {
  static let ON_RESULT_EVENT_NAME = "OnResult"

  private var handler: Handler?
 
  public func definition() -> ModuleDefinition {
    Name("ExpoEnodeLinkSDK")

    Events(ExpoEnodeLinkSDKModule.ON_RESULT_EVENT_NAME)

    Function("show") { (token: String) in
      let currentVc = appContext?.utilities?.currentViewController()!

      self.handler = Handler(linkToken: token) { (code: LinkResultCode, errorMessage: String?) in
        self.sendEvent(ExpoEnodeLinkSDKModule.ON_RESULT_EVENT_NAME, [
          "code": code.rawValue,
          "errorMessage": errorMessage
        ])
      }

      self.handler?.present(from: currentVc!)
    }
  }
}
