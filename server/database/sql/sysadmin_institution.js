/* =========================
   기관 전체조회
========================= */
const selectInstitutionList = `
SELECT institution_no
     , name
     , business_number
     , tel
     , institution_address
     , institution_email
     , DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at
     , operation
FROM institution
ORDER BY institution_no DESC
`;

/* =========================
   기관 상세조회
========================= */
const selectInstitutionByNo = `
SELECT institution_no
     , name
     , business_number
     , tel
     , institution_address
     , institution_email
     , DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at
     , operation
FROM institution
WHERE institution_no = ?
`;

/* =========================
   기관 등록
========================= */
const insertInstitution = `
INSERT INTO institution (
    name,
    business_number,
    tel,
    institution_address,
    institution_email,
    operation
) VALUES (?, ?, ?, ?, ?, ?)
`;

/* =========================
   기관 수정
========================= */
const updateInstitution = `
UPDATE institution
SET name = ?
  , business_number = ?
  , tel = ?
  , institution_address = ?
  , institution_email = ?
  , operation = ?
WHERE institution_no = ?
`;

module.exports = {
  selectInstitutionList,
  selectInstitutionByNo,
  insertInstitution,
  updateInstitution,
};
