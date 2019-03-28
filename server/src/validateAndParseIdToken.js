const jwks = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const jwtCheck = jwks({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://nghitrum.eu.auth0.com/.well-known/jwks.json`
});

const validateAndParseIdToken = idToken => {
  new Promise((resolve, reject) => {
    const { header, payload } = jwt.decode(idToken, { complete: true });
    console.log(header);
    console.log(payload);
    if (!header || !header.kid || !payload) reject(new Error('Invalid Token'));
    jwtCheck.getSigningKey(header.kid, (err, key) => {
      if (err) reject(new Error('Error getting signing key: ' + err.message));
      jwtCheck.verify(
        idToken,
        key.publicKey,
        {
          algorithms: ['RS256'],
          audience: 'http://localhost:4000/',
          issuer: 'https://nghitrum.eu.auth0.com/'
        },
        (err, decoded) => {
          if (err) reject('jwt verify error: ' + err.message);
          resolve(decoded);
        }
      );
    });
  });
};

module.exports = validateAndParseIdToken;
