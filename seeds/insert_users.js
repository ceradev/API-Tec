// seeds/insert_users.js
exports.seed = function (knex) {
    return knex('users')
      .del()
      .then(function () {
        return knex('users').insert([
          { "id": 1, "username": "Tina_Syratt", "address": "PO Box 58420", "tel": "825-183-2548", "email": "tsyratt0@linkedin.com", "perfil_id": 1, "password": "S3cr3tT!na1" },
          { "id": 2, "username": "Ravid_Smallridge", "address": "Room 1696", "tel": "364-935-8407", "email": "rsmallridge1@prweb.com", "perfil_id": 2, "password": "R@v1dP@ss2" },
          { "id": 3, "username": "Sarajane_Hollow", "address": "2nd Floor", "tel": "351-478-2802", "email": "shollow2@un.org", "perfil_id": 3, "password": "S@raP@ssw0rd3" },
          { "id": 4, "username": "Brigitte_Garlicke", "address": "Apt 710", "tel": "480-275-0598", "email": "bgarlicke3@google.com.br", "perfil_id": 4, "password": "Br!g1tteP@ss4" },
          { "id": 5, "username": "Del_Cicculini", "address": "Suite 99", "tel": "528-659-2340", "email": "dcicculini4@howstuffworks.com", "perfil_id": 5, "password": "D3lP@ssw0rd5" },
          { "id": 6, "username": "Calvin_Tiller", "address": "Apt 1344", "tel": "160-446-6830", "email": "ctiller5@mail.ru", "perfil_id": 6, "password": "C@lvinP@ssw6rd" },
          { "id": 7, "username": "Penn_Horsewood", "address": "Suite 72", "tel": "662-187-7270", "email": "phorsewood6@rediff.com", "perfil_id": 7, "password": "P3nnH0rs3w00d7" },
          { "id": 8, "username": "Rosalind_Fairn", "address": "Room 1093", "tel": "252-433-0912", "email": "rfairn7@apple.com", "perfil_id": 8, "password": "R0s@l!ndF@!rn8" },
          { "id": 9, "username": "Emanuel_Gillino", "address": "6th Floor", "tel": "943-516-9285", "email": "egillino8@ca.gov", "perfil_id": 9, "password": "3m@nu3lG1ll1n09" },
          { "id": 10, "username": "Mariska_Williment", "address": "Room 226", "tel": "806-746-9608", "email": "mwilliment9@pinterest.com", "perfil_id": 10, "password": "M@r1skaP@ss10" },
          { "id": 11, "username": "Claiborne_Margrie", "address": "Apt 352", "tel": "600-967-2316", "email": "cmargriea@lycos.com", "perfil_id": 11, "password": "Cl@!b0rn3P@ss11" },
          { "id": 12, "username": "Nap_Ogdahl", "address": "Apt 1974", "tel": "846-202-5006", "email": "nogdahlb@state.tx.us", "perfil_id": 12, "password": "N@pP@ss12" },
          { "id": 13, "username": "Janel_Handforth", "address": "Apt 1677", "tel": "218-169-1291", "email": "jhandforthc@ezinearticles.com", "perfil_id": 13, "password": "J@n3lP@ss13" },
          { "id": 14, "username": "Burnaby_Barnet", "address": "Room 16", "tel": "402-439-5362", "email": "bbarnetd@weebly.com", "perfil_id": 14, "password": "B@rn@bY14" },
          { "id": 15, "username": "Bernadine_Kenn", "address": "Apt 1194", "tel": "732-179-7007", "email": "bkennae@discuz.net", "perfil_id": 15, "password": "B3rn@d1n3P@ss15" },
          { "id": 16, "username": "Oberon_Munson", "address": "18th Floor", "tel": "441-763-9862", "email": "omunsonf@auda.org.au", "perfil_id": 16, "password": "Ober0nMunsonP@ss16" },
          { "id": 17, "username": "Abramo_Offner", "address": "14th Floor", "tel": "643-845-3087", "email": "aoffnerg@soundcloud.com", "perfil_id": 17, "password": "Abr@moP@ss17" },
          { "id": 18, "username": "Laurel_Gaffer", "address": "Room 1063", "tel": "800-517-4973", "email": "lgafferh@cargocollective.com", "perfil_id": 18, "password": "L@ur3lG@ff3r18" },
          { "id": 19, "username": "Elva_Cesar", "address": "Suite 52", "tel": "487-305-2796", "email": "ecesarici@wikipedia.org", "perfil_id": 19, "password": "3lv@C3s@r1c1P@ss19" },
          { "id": 20, "username": "Derrek_Girauld", "address": "PO Box 97109", "tel": "153-717-7259", "email": "dgirauldj@seesaa.net", "perfil_id": 20, "password": "D3rr3kP@ss20" },
          { "id": 21, "username": "Adrianna_Lodge", "address": "Suite 10", "tel": "523-723-1819", "email": "alodgek@g.co", "perfil_id": 21, "password": "Adr14nn@P@ss21" },
          { "id": 22, "username": "Teodoor_Heimann", "address": "Apt 214", "tel": "353-218-3549", "email": "theimannl@buzzfeed.com", "perfil_id": 22, "password": "T30d00rP@ss22" },
          { "id": 23, "username": "Wyn_Baptist", "address": "Room 325", "tel": "443-454-0071", "email": "wbaptistm@ucsd.edu", "perfil_id": 23, "password": "WynB@pt1stP@ss23" },
          { "id": 24, "username": "Rosella_Gilmore", "address": "1st Floor", "tel": "247-443-6231", "email": "rgilmoren@surveymonkey.com", "perfil_id": 24, "password": "R0s3ll@P@ss24" },
          { "id": 25, "username": "Marchelle_Ladson", "address": "7th Floor", "tel": "831-817-6291", "email": "mladsono@google.cn", "perfil_id": 25, "password": "M@rch3ll3P@ss25" },
        ]);
      });
  };