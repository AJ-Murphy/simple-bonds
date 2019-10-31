class Data {
  //get
  async get(url) {
    const response = await fetch(
        `https://my-json-server.typicode.com/aj-murphy/simple-bonds-api/${url}`
      ),
      responseData = await response.json();
    return responseData;
  }

  //post
  async post(url, data) {
    const response = await fetch(
        `https://my-json-server.typicode.com/aj-murphy/simple-bonds-api/${url}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        }
      ),
      responseData = await response.json();
    return responseData;
  }

  async delete(url) {
    const response = await fetch(
      `https://my-json-server.typicode.com/aj-murphy/simple-bonds-api/${url}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      }
    );

    responseData = await response.json();
    return responseData;
  }
}
