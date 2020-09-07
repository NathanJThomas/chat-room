document.getElementById('join-form').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const chatId = document.getElementById('chat-id').value;

    if(name === "" || chatId === "") {
        document.querySelector('.error').style.display = "block";
        return;
    }

    // body = {
    //     username: name,
    //     chatId: chatId
    // };

    // const response = await fetch('/chat', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    // });
    // console.log(response)
    // window.location.href = response.url;

    const response = await fetch(`/chat?username=${name}&chatId=${chatId}`);
    window.location.href = response.url;
})