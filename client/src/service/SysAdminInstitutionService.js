async function getInstitutionList() {
    const res = await fetch('/api/sysadmin/institutions');
    return await res.json();
}

export { getInstitutionList };
