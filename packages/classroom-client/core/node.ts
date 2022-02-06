import BaseRianAraiClassroom from ".";
import { BaseUser } from "./base";

export type NodeGoogleSignIn = {
  signIn: () => Promise<BaseUser>;
  isSignningIn: () => boolean;
  destroy: (force?: boolean) => void;
};

export default class RianAraiClassroom extends BaseRianAraiClassroom {
  protected signInInstance: NodeGoogleSignIn;

  constructor(instance: NodeGoogleSignIn) {
    super();
    this.signInInstance = instance;
  }

  isSigningIn() {
    return this.signInInstance.isSignningIn();
  }

  destroySignIn(force?: boolean) {
    return this.signInInstance.destroy(force);
  }

  /**
   * Native Google SignIn function for Electron Main process.
   *
   * You should call this function instead of `RianAraiClassroom.signIn()`
   * to ensure that desktop authorizaton flow works.
   */
  async nativeSignIn() {
    this.user = await this.signInInstance.signIn();
    this._sendAuthChangeEvent(true);
    return this.user;
  }
}
