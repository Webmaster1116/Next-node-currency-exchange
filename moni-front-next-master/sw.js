console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Testing Notification...",
    icon:
      "https://banner2.cleanpng.com/20180517/sxw/kisspng-computer-icons-encapsulated-postscript-5afe09d7303573.9440992115265981031975.jpg",
  });
});
