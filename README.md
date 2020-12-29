# artificial-challange
hacker news, puppeteer, react, express,

1. Select a single "ASK HN: Who is hiring" thread using Hacker News' API or your preferred data scraping method (e.g. puppeteer)
2. Use the data gathered from that thread to build an app that allows to display job offers
3. Create a filter for those listings based on position/salary/remote

##Requirements
- mongodb

#Initial & run
```
npm run create
npm run start
```
or
```
yarn create
yarn start
```


#Server
Server is using https://hn.algolia.com/api/v1 API. 
1. Client can get data for specified HN item ID, which can also be filtered, sorted, paginated
2. Every 30min server is refreshing data for each given HN item ID, data is stored "as is" in mongoDB
3. Data is provided database-first so if there are no records than worst time case occurs because server needs to fetch new data
4. Additionally, two measuring endpoints are delivered to test puppeteer and algolia endpoint itself

#Client
Server is using both https://hn.algolia.com/api/v1 and Server API.
1. User can choose threads from list restricted by tags = "story" and "author_whoishiring"
2. Data is fetched filtered, sorted, paginated from Server, cached by react-query
3. Request state is also stored in URL of app so that is preserved during tab refresh or can be shared with link
4. User choice of topic is stored in localStorage
5. All filters are highlighted as well as found salary ranges
