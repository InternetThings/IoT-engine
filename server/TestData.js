Meteor.startup(function() {

  var user_id;

  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: "TestUser",
      email: "testuser@test.dk",
      password: "123"
    });
  }

  var user = Meteor.users.findOne({
    username: "TestUser"
  });

  if (user) {
    console.log("user._id: " + user._id);
    user_id = user._id;
    console.log("user_id: " + user_id);
  }

  if (AccessTokens.find().count() === 0) {
    AccessTokens.insert({
      "_id": "S5i73FTJqKTQx493y",
      "sensor": "S1",
      "userId": user_id,
      "public": false,
      "type": "Temperature",
      "location": "Living room"
    });

    AccessTokens.insert({
      "_id": "fhKDR4DhnSQ2aagbx",
      "sensor": "S2",
      "userId": user_id,
      "public": false,
      "type": "Temperature",
      "location": "Bed room"
    });

    AccessTokens.insert({
      "_id": "TcRyQtkNdtwJJMmCe",
      "sensor": "S3",
      "userId": user_id,
      "public": false,
      "type": "Temperature",
      "location": "Green house"
    });

    AccessTokens.insert({
      "_id": "sbW2P6qER7zsv52k4",
      "sensor": "S4",
      "userId": user_id,
      "public": false,
      "type": "Proximity",
      "location": "Green house window 1"
    });

    AccessTokens.insert({
      "_id": "aLrguxPBvw2FqZ6MT",
      "sensor": "S5",
      "userId": user_id,
      "public": false,
      "type": "Humidity",
      "location": "Living room"
    });

    AccessTokens.insert({
      "_id": "5fC4hnugCQjJudYjF",
      "sensor": "S6",
      "userId": user_id,
      "public": false,
      "type": "Humidity",
      "location": "Bed room"
    });

    AccessTokens.insert({
      "_id": "HfNzbFbWAXhrh65w7",
      "sensor": "S7",
      "userId": user_id,
      "public": false,
      "type": "Humidity",
      "location": "Ø-haven pallet"
    });

    AccessTokens.insert({
      "_id": "hRXqqFPYusmsju7PC",
      "sensor": "S8",
      "userId": user_id,
      "public": false,
      "type": "Temperature",
      "location": "Ø-haven"
    });

    AccessTokens.insert({
      "_id": "HjXCPmYEQuE8XFzmC",
      "sensor": "S9",
      "userId": user_id,
      "public": false,
      "type": "Humidity",
      "location": "Green house"
    });
  }

  if (RuleSets.find().count() === 0) {
    RuleSets.insert({
      "_id": "uPCFRZP6erL8GgLse",
      "title": "Away on vacation",
      "message": "If you see this message could you please water my pallet, thank you!",
      "conditions": [{
        "accessToken_id": "HfNzbFbWAXhrh65w7",
        "operator": "<",
        "targetValue": "10",
        "fulfilled": false
      }, {
        "accessToken_id": "hRXqqFPYusmsju7PC",
        "operator": ">",
        "targetValue": "20",
        "fulfilled": false
      }],
      "userId": user_id
    });

    RuleSets.insert({
      "_id": "74SXCd8Dz8eTbjrsk",
      "title": "Bed room humidity",
      "message": "The bed room is too humid.",
      "conditions": [{
        "accessToken_id": "5fC4hnugCQjJudYjF",
        "operator": ">",
        "targetValue": "50",
        "fulfilled": false
      }],
      "userId": user_id
    });

    RuleSets.insert({
      "_id": "pCt75N3oTDqQuSMLb",
      "title": "Green house condition",
      "message": "Your plants current condition are less than ideal",
      "conditions": [{
        "accessToken_id": "TcRyQtkNdtwJJMmCe",
        "operator": ">",
        "targetValue": "20",
        "fulfilled": false
      }, {
        "accessToken_id": "TcRyQtkNdtwJJMmCe",
        "operator": "<",
        "targetValue": "30",
        "fulfilled": false
      }, {
        "accessToken_id": "HjXCPmYEQuE8XFzmC",
        "operator": ">=",
        "targetValue": "40",
        "fulfilled": false
      }, {
        "accessToken_id": "HjXCPmYEQuE8XFzmC",
        "operator": "<=",
        "targetValue": "60",
        "fulfilled": false
      }],
      "userId": user_id
    });

    RuleSets.insert({
      "_id": "SsRgeAY9pezsQpm9z",
      "title": "Green House Window Status",
      "message": "The window is now open",
      "conditions": [{
        "accessToken_id": "sbW2P6qER7zsv52k4",
        "operator": "=",
        "targetValue": "1",
        "fulfilled": false
      }],
      "userId": user_id
    });
  }

  if (Notifications.find().count() === 0) {
    Notifications.insert({
      "_id": "565fffbf403b6b1d1b7e18bf",
      "date": new Date("July 08, 2016, 13:00:00"),
      "ruleset": "uPCFRZP6erL8GgLse",
      "message": "If you see this message could you please water my pallet, thank you! :)",
      "userId": user_id
    });

    Notifications.insert({
      "_id": "56600249403b6b1d1b7e18c0",
      "date": new Date("July 14, 2016, 10:00:00"),
      "ruleset": "74SXCd8Dz8eTbjrsk",
      "message": "The humidity in the bed room is too high",
      "userId": user_id
    });

    Notifications.insert({
      "_id": "566002dc403b6b1d1b7e18c1",
      "date": new Date("July 20, 2016, 11:00:00"),
      "ruleset": "pCt75N3oTDqQuSMLb",
      "message": "Your plants current condition are less than ideal",
      "userId": user_id
    });

    Notifications.insert({
      "_id": "56604266403b6b1d1b7e18c2",
      "date": new Date("July 18, 2016, 14:00:00"),
      "ruleset": "SsRgeAY9pezsQpm9z",
      "message": "The window is open",
      "userId": user_id
    });
  }
});
