class Data {
  //get
  async get(url) {
    const response = await fetch(`http://165.227.229.49:8000/${url}`),
      responseData = await response.json();
    return responseData;
  }

  //post
  async post(url, data) {
    const response = await fetch(`http://165.227.229.49:8000/${url}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }),
      responseData = await response.json();
    return responseData;
  }

  async delete(url) {
    const response = await fetch(`http://165.227.229.49:8000/${url}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });

    responseData = await response.json();
    return responseData;
  }
}
