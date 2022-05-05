import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
});

client.query({
    query: gql(`
        query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `)
}).then(result => console.log(result));

const GET_DOGS = gql(`
    query GetDogs {
        dogs {
            id
            breed
        }
    }
`)


function Dogs({onDogSelected}) {
    const {loading, error, data} = useQuery(GET_DOGS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <select name="dog" onChange={onDogSelected}>
            {data.dogs.map(dog => (
                <option key={dog.id} value={dog.breed}>
                    {dog.breed}
                </option>
            ))}
        </select>
    );
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app 🚀</h2>
            <Dogs/>
        </div>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
