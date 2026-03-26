async function getAdminMyPage(userNo) {
    const res = await fetch(`/api/admin/mypage/${userNo}`);
    const text = await res.text();
    return JSON.parse(text);
}

async function updateAdminMyPage(userNo, adminInfo) {
    const res = await fetch(`/api/admin/mypage/${userNo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminInfo)
    });

    const text = await res.text();
    return JSON.parse(text);
}

export { getAdminMyPage, updateAdminMyPage };
