const selectInstitutionList = `
SELECT institution_no
     , name
     , tel
     , institution_email AS email
     , DATE_FORMAT(created_at, '%Y.%m.%d') AS created_at
     , operation
FROM institution
ORDER BY institution_no DESC
`;

module.exports = {
  selectInstitutionList,
};
