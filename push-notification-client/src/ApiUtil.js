const request = (options) => {
  const headers = new Headers();

  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function sendNotification(username, notificationRequest) {
  return request({
    url: "http://localhost:8080/notification/" + username,
    method: "POST",
    body: JSON.stringify(notificationRequest),
  });
}
