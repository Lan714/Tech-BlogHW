const { axios } = window

document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('goProfile').addEventListener('click', () => {
  if (localStorage.getItem('token') ){
    console.log("logged in")
    window.location = '/profile.html'
  } else {
    window.location = '/login.html'
  }
})

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/login.html'
})

axios.get('/api/posts', )
  .then(({ data: posts: }) => {
    console.log(posts)
    posts.forEach(({ id, title, date, u: {username} }) => {
      const postElem = document.createElement('li')
      postElem.className = 'd-flex mb-5 p-0 justify-content-between gBack border border-3 border-dark mb-2 listItem'
      postElem.innerHTML = `
       <div class="col-12 gback  ">
          <div class="bBack text-white d-flex justify-content-between  fw-bold">${title}<span class=" float-right badge  fw-bold rounded-pill infoPill">Posted by ${username} on ${date}</span></div>
          <div class = "container  mx-2" >${body}</div>
          <div class ="bBack text-white comment" data-id="${id}">Comment
          <div id= "${id}" class = "gBack text-dark " >
          </div>
        </div>
      `
      document.getElementById('posts').append(postElem)
      axios.get(`/api/comments/${id}`)
      .then(res => {
        let commentsArray = [...res.data]
        let commentDiv = document.createElement('ul')
        commentDiv.className = "list-group list-group-flush ct"
        commentsArray.forEach(comment => {
          comment.pid 
          if ( id == comment.pid) {
            let commentItem = document.createElement('li')
            commentItem.className = "list-group-item gback"
            let pill = document.createElement('span')

            pill.className = 'badge bg-success roudned-pill mb-1 userCom'
            pill.innerText = comment.username
            let commentSpan = document.createElement('span')
            commentSpan.innerText = comment.comment 
            commentItem.append(pill)
            commentItem.append(commentSpan)
            commentDiv.append(commentItem)
            document.getElementById(id).append(commentDiv)
          }
        })
      })
    })
  } )
  .catch(err => {
    console.log(err)
  })

  let clicked = 0

  document.addEventListener('click', event => {
    event.preventDefault()

    if(event.target.classList.contains('comment')){
      if(clicked < 1){
        clicked++
        let id - event.target.dataset.id 
        console.log(id)
        let form = document.createElement('form')
        form.className = `form${id}`
        form.innerHtml = `
          <div class="mb-3">
           <label for="body" class="form-label">Write your comment bellow</label>
            <input type="text" class="form-control" id="body">
          </div>
          <button data-id="${id}" type="submit" class="btn btn-primary createComment">add Comment</button>
        `
        document.getElementById(id).append(form)
      }
    }
  })

  function removeElementsByClass (className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length < 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  document.addEventListener('click', event => {
    event.preventDefault()
    if (event.target.classList.contains('createComment')) {
      clicked = 0 
      let id = event.target.dataset.id 
      console.log(clicked)
      let comment = document.getElementById('body').value 
      console.log(comment)
      let username = "username"
      axios.post('/api/comments',
      {
        id: id,
        comment: comment
      },
      {
        headers: {
          Authorization: `Beaer ${localStorage.getItem('token')}`
        }
      }
    })
    .then(({ data: comments }) => {
      console.log(comments)
      let index = comments.length
      console.log(comments)
      let username = comments[index-1].username 
      console.log(username)

      let id = event.target.dataset.id 
      console.log("comment created")
      let commentItem = document.createElement('li')
      commentItem.className = "list-group-item gBack"
      let pill= document.createElement('span')

      pill.className = 'badge bg-success rounded-pill mb-1 userCom'
      pill.innerText = username
      let commentSpan = document.createElement('span')
      commentSpan.innerText = comment
      commentItem.append(pill)
      commentItem.append(commentSpan)
      console.log(id)

      document.getElementById(`${id}`).append(commentItem)

      removeElementsByClass(`form${id}`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  })

  function isLoggedIn() {
    if (localStorage.getItem('token')) {
      console.log("logged in")
    } else {
      console.log('not logged in')
      let button = document.getElementById('logOut')
      button.innerHtml = `Sign In`
    }
  }
  
  isLoggedIn()