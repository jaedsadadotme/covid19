window.onscroll = function () { scrollFunction() };
let datas = document.getElementById("detail").querySelectorAll("a");
datas.forEach(data => {
    client.get(`/api/convertMeta?url=${data.attributes[0].nodeValue}`, function (response) {
        data.innerHTML = `
            <div>
              <div class="media shadow-sm link" style="">
                <img class="mr-3" style="width: 150px;height: 150px;" src="${JSON.parse(response).image}" alt="Generic placeholder image">
                <div class="media-body">
                  <h5 class="mt-0" style="width: 300px;">${JSON.parse(response).title}</h5>
                  ${JSON.parse(response).description}
                </div>
              </div>
            </div>
              `
    });
})