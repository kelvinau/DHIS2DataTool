const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');

// DHIS2DataTool
const secret = require('../.key.json').CLIENT_SECRET;


//
// TODO: To get the access_token for now...
// fetch('/api/authorize', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     username: {USERNAME},
//     password: {PASSWORD},
//   }),
// }).then((res) => res.text()).then((res) => console.log(res)).catch(e => console.log(e));

router.post('/authorize', (req, res, next) => {

  console.log(req);
  const URL = 'https://mfm.obgyn.ubc.ca/dhis/uaa/oauth/token';
  const data = qs.stringify({
    grant_type: 'password',
    username: req.body.username,
    password: req.body.password
  });

  axios.post(URL, data, {
    auth: {
      username: 'DHIS2DataTool',
      password: secret,
    },

  }).then((response) => {
    res.send(access_token);
  }).catch(({
    response
  }) => {
    console.log(response);
    res.send(response.data);
  });
});

// https://mfm.obgyn.ubc.ca/dhis/api/28/events/query.json?orgUnit=t4WT3BeI0kz&programStage=mjwwdYxgehV&includeAllDataElements=false
// example: http://localhost:9000/api/getData?orgUnit=t4WT3BeI0kz&programStage=mjwwdYxgehV

// https://mfm.obgyn.ubc.ca/dhis/uaa/oauth/authorize?client_id=demo&response_type=code
router.get('/getData', (req, res, next) => {
  const DHIS_URL = 'https://mfm.obgyn.ubc.ca/dhis/api/30/events/query.json';
  // const DHIS_URL = 'https://google.com';
  const params = {
    orgUnit: req.query.orgUnit,
    programStage: req.query.programStage,
    includeAllDataElements: false,
  }
  axios.get(DHIS_URL, {
      params,

      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })

});




module.exports = router;