const authModule = require('./auth/auth.module');
const registrationModule = require('./registration/registration.module');
const adViewerModule = require('./ad-viewer/ad-viewer.module');
const adManagerModule = require('./ad-manager/ad-manager.module');
const communicationModule = require('./communication/communication.module');

module.exports = {
  authModule,
  registrationModule,
  adViewerModule,
  adManagerModule,
  communicationModule,
};
