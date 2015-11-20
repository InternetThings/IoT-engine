<<<<<<< HEAD
/**MochaWeb.testOnly(function() {
=======
/*MochaWeb.testOnly(function() {
>>>>>>> 4c8421e2622421f163a92b5a6b80967f2fcaa075
  describe('user is created.', function() {
    it('creates user.', function() {
        console.log('User is being created');
      Accounts.createUser({
        username: "test",
        email: "test@test.test",
        password: "123"
      });
      console.log('Created');

      chai.assert(Meteor.users.findOne({
        username: "test"
      }) !== undefined);

      console.log('Asserted');
      Meteor.users.remove({username: "test"});
    });
  });
<<<<<<< HEAD
});
**/
=======
});*/
>>>>>>> 4c8421e2622421f163a92b5a6b80967f2fcaa075
