async function getUsers() {
    let url = 'https://api.rootnet.in/covid19-in/notifications';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    let html = '';
    users.data.notifications.forEach(user => {
        // let htmlSegment = `<div class="user">
        //                     <a href="${user.link}">${user.title}</a>
        //                 </div>`;

        let htmlSegment = `<tr><td> <a href="${user.link}">${user.title}</a> </td></tr>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.notifications_section');
    container.innerHTML = html;


}

renderUsers();

var el = $(".table-responsive");

function anim() {
    var st = el.scrollTop();
    var sb = el.prop("scrollHeight") - el.innerHeight();
    el.animate({
        scrollTop: st < sb / 2 ? sb : 0
    }, 50000, anim);
}

function stop() {
    el.stop();
}
anim();
el.hover(stop, anim);
