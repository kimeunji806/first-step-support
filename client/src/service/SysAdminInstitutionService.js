/* =========================
   기관 목록 조회
========================= */
async function getInstitutionList() {
    const res = await fetch('/api/sysadmin/institutions');
    return await res.json();
}

/* =========================
   기관 상세 조회
========================= */
async function getInstitutionDetail(institutionNo) {
    const res = await fetch(`/api/sysadmin/institutions/${institutionNo}`);
    return await res.json();
}

/* =========================
   기관 등록
========================= */
async function createInstitution(payload) {
    const res = await fetch('/api/sysadmin/institutions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return await res.json();
}

/* =========================
   기관 수정
========================= */
async function updateInstitution(institutionNo, payload) {
    const res = await fetch(`/api/sysadmin/institutions/${institutionNo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return await res.json();
}

export { getInstitutionList, getInstitutionDetail, createInstitution, updateInstitution };
