Promise.all([
  fetch('https://places.googleapis.com/v1/places/ChIJi-8-gTUbdkgRvgRcAHEwuyc?fields=displayName,formattedAddress,internationalPhoneNumber,websiteUri,googleMapsUri&key=AIzaSyCz9nqHkwStBxOyN9jDuApDKYS7_zQH0qc'),
  fetch('https://places.googleapis.com/v1/places/ChIJV8gP0ykFdkgRFEAEHoE1YVk?fields=displayName,formattedAddress,internationalPhoneNumber,websiteUri,googleMapsUri&key=AIzaSyCz9nqHkwStBxOyN9jDuApDKYS7_zQH0qc')
]).then(function (responses) {
  return Promise.all(responses.map(function (response) {
    return response.json();
  }));
}).then(function (data) {
  for (var i = 0; i < data.length; i++) {
    var unformattedPhone = data[i].internationalPhoneNumber;
    var formattedPhone = unformattedPhone.replace(/\s/g, '');
    document.getElementById('container').innerHTML += 
    '<section><article class="location"><h1>' + data[i].displayName.text + '</h1><figure><figcaption>Address</figcaption><a href="' + data[i].googleMapsUri + '">' + data[i].formattedAddress + '</a></figure>' +
    '<figure><figcaption>Phone Number</figcaption><a href="tel:' + formattedPhone + '">' + data[i].internationalPhoneNumber + '</a></figure>' + '<figure><figcaption>Website</figcaption><a href="' + data[i].websiteUri + '">' + data[i].websiteUri + '</a></figcaption></article></section>'
  }
  console.log(data);
}).catch(function (error) {
    console.log(error);
});