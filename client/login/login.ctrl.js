/**
 * A small controller to explain the syntax we will be using
 * @return {function} A controller that contains 2 test elements
 */
'use strict';
const ERRORS_MAP = {
  'Error.Passport.Password.Wrong': 'incorrect username/password combination',
  'Error.Passport.Username.NotFound': 'incorrect username/password combination',
  'Error.Passport.Email.Missing': 'invalid email address',
  'Error.Passport.Password.Missing': 'missing password',
  'Error.Passport.Password.Invalid': 'invalid password (must be at least 8 characters long)',
  'Error.Passport.Bad.Username': 'invalid username (must be 1-20 alphanumeric characters)',
  'Error.Passport.Username.Taken': 'a user with that name already exists'
};
module.exports = function ($scope, $http) {
  this.register = () => {
    return $http({
      method: 'POST',
      url: '/auth/local/register',
      data: {
        name: $scope.registerName,
        password: $scope.registerPassword,
        email: $scope.registerEmail
      }
    }).then(() => {
      window.location = '/';
    }).catch(res => {
      if (res.status === 401 && ERRORS_MAP[res.data]) {
        this.registerError = ERRORS_MAP[res.data];
      } else {
        console.error(res.data);
        this.registerError = 'An unknown error occured.';
      }
    });
  };
  this.login = () => {
    return $http({
      method: 'POST',
      url: '/auth/local',
      data: {
        name: $scope.loginName,
        password: $scope.loginPassword
      }
    }).then(() => {
      window.location = '/';
    }).catch(res => {
      if (res.status === 401 && ERRORS_MAP[res.data]) {
        this.loginError = ERRORS_MAP[res.data];
      } else {
        console.error(res.data);
        this.loginError = 'An unknown error occured.';
      }
    });
  };
};
