/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = 'Push Codelab';
    const options = {
      body: 'Yay it works.',
      icon: 'images/icon.png',
      badge: 'images/badge.png',
      vibrate: [200, 100, 200, 100, 200, 100, 400],
      tag: "request",
      actions: [
        { action: "yes", title: "Yes", icon: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/96/Actions-dialog-ok-apply-icon.png" },
        { action: "no", title: "No", icon: "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/96/Actions-edit-delete-icon.png" }
      ]
    };
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
  });

  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    var messageId = event.notification.data;

    event.notification.close();

    if (event.action === 'yes') {  
      clients.openWindow("https://developers.google.com/web/?reply=yes" + messageId);
    }  
    else if (event.action === 'no') {  
      clients.openWindow("/messages?reply=" + messageId);  
    }  
    else {  
      clients.openWindow('https://developers.google.com/web/')
    } 
    // event.waitUntil(
    //   clients.openWindow('https://developers.google.com/web/')
    // );
  });