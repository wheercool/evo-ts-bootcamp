export async function getPizza() {
  return {
    items: [
      {
        name: 'Los-Angeles pizza',
        price: 34,
        _id: '606a0743b3b2f0b339363de2'
      },
      {
        name: 'Chicago pizza',
        price: 100,
        _id: '606a0743b3b2f0b339363de3'
      },
      {
        name: 'New-York pizza',
        price: 15.42,
        _id: '606a07ea1a45d242a7b77fe2'
      },
      {
        name: 'Midtown pizza',
        price: 20.45,
        _id: '606a07ea1a45d242a7b77fe3'
      }
    ]
  };
}

export async function log(message: string) {
  fetch('http://localhost:3001/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: message
  }).then((json) => {
    console.log(json);
  }).catch((ex) => {
    console.log(ex)
  });
}
