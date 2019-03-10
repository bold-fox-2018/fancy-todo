function fetchNotifications() {
    console.log(projectInvitations)
    $('#todoContents').empty()
    let notifs = ``

    projectInvitations.forEach(notif => {
        notifs += `
        <div class="alert alert-dismissible alert-success" style="max-width: 1000px;">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            You got an invitation from <strong>${notif.creator.name}</strong> to join a Project named <strong>${notif.name}</strong>. Please <a href="#" onclick="invitationAccepted('${notif._id}')">Accept</a> or you can <a href="#" onclick="invitationRejected('${notif._id}')">Reject</a> this invitation.
        </div>
        `
    });

    $('#todoContents').append(`
        <h2>Notifications</h2>
        <hr>
        <div id="notifications" class="my-4">
            ${notifs}
        </div>
    `)
}

function invitationAccepted(id) {
    server({
        url: `/projects/user-accepting-invitation/${id}`,
        method: 'patch',
        headers: {
            access_token: localStorage.getItem('token')
        }
    })
    .then(({data}) => {
        console.log(data)
        $('#todoContents').empty()
        $('#todoContents').append(`
        <h4>Accepting Invitations... </h4>
        <img style="margin: 0 auto; text-align: center;" src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif">
        `)
        setTimeout(function () {
            getAllInvitationsForNotifications()
        }, 2000)
        setTimeout(function () {
            $('#todoContents').empty()
            fetchNotifications()
        }, 3000)
    })
    .catch(err => {
        console.log(err)
    })
}

function invitationRejected(id) {
    server({
        url: `projects/user-rejecting-invitation/${id}`,
        method: 'patch',
        headers: {
            access_token: localStorage.getItem('token')
        }
    })
    .then(({data}) => {
        $('#todoContents').empty()
        $('#todoContents').append(`
        <h4>Rejecting Invitations... </h4>
        <img style="margin: 0 auto; text-align: center;" src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif">
        `)
        setTimeout(function () {
            getAllInvitationsForNotifications()
        }, 2000)
        setTimeout(function () {
            $('#todoContents').empty()
            fetchNotifications()
        }, 3000)
    })
    .catch(err => {
        console.log(err)
    })
}