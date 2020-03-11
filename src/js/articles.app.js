var articlesApp = (function () {

    function viewArticles() {
  
      let uri = `${window.location.origin}/api/articles`;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', uri);
  
      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );
  
      xhr.send();
  
      xhr.onload = function () {
        let app = document.getElementById('app');
        let data = JSON.parse(xhr.response);
        let articles = data.articles;
        let table = '';
        let rows = '';
  
        //Loop each article record into it's own HTML table row, each article should
        //have a link a article view
        for (let i = 0; i < articles.length; i++) {
          rows = rows + `<tr>
            <td>
              <a href="#view-${articles[i]['_id']}">${articles[i]['title']}</a>
            </td>
            <td>${articles[i]['description']}</td>
            <td>`
              +
              (articles[i]['published'] ? `${articles[i]['published'].slice(0, 19).replace('T', ' ')}` : `No Publication Date Set`)
              +`
            </td>
          </tr>`;
        }
  
        //Create an articles panel, add a table to the panel, inject the rows into the
        //table
        table = `<div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">Posts</h2>
            <div class="float-right">
              <a href="#create" class="btn btn-primary">New Post</a>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Date Published</td>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
  
        //Append the HTML to the #app
        app.innerHTML = table;
      }
    }
  
    function createArticle() {
      var app = document.getElementById('app');
  
      var form = `
          <div class="card">
            <div class="card-header clearfix">
              <h2 class="h3 float-left">New Post</h2>
              <div class="float-right">
                <a href="#" class="btn btn-primary">Cancel</a>
              </div>
            </div>
            <div class="card-body">
              <form id="createArticle" class="card-body">
                <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
  
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" class="form-control" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="published">Publish On</label>
                    <input type="datetime-local" id="published" name="published" class="form-control" required>
                  </div>
                </div>
  
                <div class="row">
                  <div class="form-group col-md">
                    <label for="body">Body</label>
                    <textarea id="body" name="body" class="form-control" rows="6" required></textarea>
                  </div>
                </div>
  
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="description">Summary</label>
                    <input type="text" id="description" name="description" class="form-control" required>
                  </div>
  
                  <div class="form-group col-md-6">
                    <label for="keywords">Keywords (separated by commas)</label>
                    <input type="text" id="keywords" name="keywords" class="form-control" required>
                  </div>
                </div>
  
                <div class="text-right">
                  <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
                </div>
              </form>
            </div>
          </div>
      `;
  
  
      app.innerHTML = form;
    }
  
    function viewArticle(id){
  
      let uri = `${window.location.origin}/api/articles/${id}`;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', uri);
  
      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );
  
      xhr.send();
  
      xhr.onload = function(){
  
        let app = document.getElementById('app');
        let data = JSON.parse(xhr.response);
        let card = '';
  
        card = `<div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">${data.article.title}</h2>
            <div class="float-right">
              <a href="#edit-${data.article._id}" class="btn btn-primary">Edit</a>
            </div>
          </div>
          <div class="card-body">
            <div class="blockquote">${data.article.body}</div>
            <br>
            <div>Tagged: <em>${data.article.keywords}</em></div>
          </div>
        </div>
  
        `;
  
        app.innerHTML = card;
      }
    }
  
    function editArticle(id) {
  
      let uri = `${window.location.origin}/api/articles/${id}`;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', uri);
  
      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );
  
      xhr.send();
  
      xhr.onload = function () {
        let app = document.getElementById('app');
        let data = JSON.parse(xhr.response);
        var date = Date(data.article.published);
        console.log(date);
        var form = `
          <div class="card">
            <div class="card-header clearfix">
              <h2 class="h3 float-left">Edit Post</h2>
              <div class="float-right">
                <a href="#" class="btn btn-primary">Cancel</a>
              </div>
            </div>
            <div class="card-body">
              <form id="editArticle" class="card-body">
                <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
  
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" class="form-control" value="${data.article.title}" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="published">Published On</label>
                    <input type="datetime-local" id="published" name="published" class="form-control" value="${date}" required>
                  </div>
                </div>
  
                <div class="row">
                  <div class="form-group col-md">
                    <label for="body">Body</label>
                    <textarea id="body" name="body" class="form-control" rows="6" required>${data.article.body}</textarea>
                  </div>
                </div>
  
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="description">Summary</label>
                    <input type="text" id="description" name="description" class="form-control" value="${data.article.description}" required>
                  </div>
  
                  <div class="form-group col-md-6">
                    <label for="keywords">Keywords (separated by commas)</label>
                    <input type="text" id="keywords" name="keywords" class="form-control" value="${data.article.keywords}" required>
                  </div>
                </div>
                <div>
                  <input type="hidden" id="_id" name="_id" class="form-control" value="${data.article._id}" required>
                </div>
                <div>
                  <input type="hidden" id="created" name="created" class="form-control" value="${data.article.created}" required>
                </div>
  
                <div class="text-right">
                  <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
                </div>
              </form>
            </div>
            <div>
              <a href="#delete-${data.article._id}" class="text-danger">Delete</a>
            </div>
          </div>
  
    `;
  
        app.innerHTML = form;
        processRequest('editArticle', '/api/articles', 'PUT');
      }
    }
  
    function processRequest(formId, url, method) {
      let form = document.getElementById(formId);
      form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        let formData = new FormData(form);
        let uri = `${window.location.origin}${url}`;
        let xhr = new XMLHttpRequest();
        xhr.open(method, uri);
  
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
  
        let object = {};
        formData.forEach(function (value, key) {
          object[key] = value;
        });
  
        xhr.send(JSON.stringify(object));
        xhr.onload = function () {
          let data = JSON.parse(xhr.response);
          if (data.success === true) {
            window.location.href = '/articles/app';
          } else {
            document.getElementById('formMsg').style.display = 'block';
          }
        }
      });
    }
  
        function deleteView(id){
  
          let uri = `${window.location.origin}/api/articles/${id}`;
          let xhr = new XMLHttpRequest();
          xhr.open('GET', uri);
  
          xhr.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8'
          );
  
          xhr.send();
  
          xhr.onload = function(){
            let app = document.getElementById('app');
            let data = JSON.parse(xhr.response);
            let card = '';
  
            card = `<div class="card bg-transparent border-danger text-danger bg-danger">
              <div class="card-header bg-transparent border-danger">
                <h2 class="h3 text-center">You're deleting this article</h2>
              </div>
              <div class="card-body text-center">
                <div>
                  Are you sure you want to delete
                  <strong>${data.article.title}</strong>
                </div>
  
                <div>Summary: <strong>${data.article.description}</strong></div>
  
                <div class="text-center">
                  <br>
                  <a onclick="articlesApp.deleteArticle('${data.article._id}');" class="btn btn-lg btn-danger text-white">
                    Yes delete ${data.article.description}
                  </a>
                </div>
  
              </div>
            </div>`;
  
            app.innerHTML = card;
          }
        }
  
        function deleteArticle(id){
  
          let uri = `${window.location.origin}/api/articles/${id}`;
          let xhr = new XMLHttpRequest();
          xhr.open('DELETE', uri);
  
          xhr.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8'
          );
  
          xhr.send();
  
          xhr.onload = function(){
            let data = JSON.parse(xhr.response);
            if(data.success === true){
              window.location.hash = '#';
            }else{
              alert('Unknown error, the article could not be deleted');
            }
  
          }
  
        }
  
    return {
      deleteArticle: function(id){
        deleteArticle(id);
      },
      load: function () {
        let hash = window.location.hash;
        let hashArray = hash.split('-');
  
        switch (hashArray[0]) {
          case '#create':
            createArticle();
            processRequest('createArticle', '/api/articles', 'POST');
            break;
  
          case '#view':
            viewArticle(hashArray[1]);
            break;
  
          case '#edit':
            editArticle(hashArray[1]);
            break;
  
          case '#delete':
            deleteView(hashArray[1]);
            break;
  
          default:
            viewArticles();
            break;
        }
      }
    }
  })()
  
  
  articlesApp.load();
  
  window.addEventListener("hashchange", function () {
    articlesApp.load();
  })