X_API_KEY=$(grep API_KEY .env | cut -d "=" -f2 | tr -d '"');
PORT=$(grep -e "^PORT=" .env | cut -d "=" -f2 | tr -d '"');

echo
echo "creating sellerId=00000000-0000-0000-0000-000000000001"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/sellers" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "00000000-0000-0000-0000-000000000001",
  "name": "Monsoon Carbon",
  "addressLine1": "Mt Arrakis 42, Dune plains",
  "addressLine2": "Aix en Provence, 12345, France",
  "contactPerson": "Paul Atreides"
}'

echo
echo "creating buyerId=00000000-0000-0000-0000-000000000002"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/buyers" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "00000000-0000-0000-0000-000000000002",
  "name": "-"
}'

echo
echo "creating buyerId=00000000-0000-0000-0000-000000000003"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/buyers" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "00000000-0000-0000-0000-000000000003",
  "name": "-"
}'

echo
echo "creating nodeId=f00001 for buyerId=00000000-0000-0000-0000-000000000002"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/nodes" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "f00001",
  "buyerId": "00000000-0000-0000-0000-000000000002"
}'

echo
echo "creating nodeId=f00002 for buyerId=00000000-0000-0000-0000-000000000003"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/nodes" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "f00002",
  "buyerId": "00000000-0000-0000-0000-000000000003"
}'

echo
echo "creating certificateId=00000000-0000-0000-0000-000000000333"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/certificates" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "00000000-0000-0000-0000-000000000333",
  "generatorName": "Solar 1 - Non Bua Lampon",
  "generatorId": "NA",
  "initialSellerId": "00000000-0000-0000-0000-000000000001",
  "region": "north_china",
  "country": "China",
  "energySource": "Wind",
  "generationStart": "2020-11-01T00:00:00.000Z",
  "generationEnd": "2021-06-01T23:59:59.999Z",
  "energy": "10000"
}'

echo
echo "creating purchase of certificateId=00000000-0000-0000-0000-000000000333, 00000000-0000-0000-0000-000000000001 -> 00000000-0000-0000-0000-000000000002"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/purchases" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "00000000-0000-0000-0000-000000444444",
  "certificateId": "00000000-0000-0000-0000-000000000333",
  "sellerId": "00000000-0000-0000-0000-000000000001",
  "buyerId":  "00000000-0000-0000-0000-000000000002",
  "recsSold": 3,
  "recsTransactions": [
    {
      "year": 2020,
      "amount": 2
    },
    {
      "year": 2021,
      "amount": 1
    }
  ],
  "filecoinNodes": [{"id": "f00001"}]
}'

echo
echo "creating purchase of certificateId=00000000-0000-0000-0000-000000000333, 00000000-0000-0000-0000-000000000001 -> 00000000-0000-0000-0000-000000000003"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/purchases" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "00000000-0000-0000-0000-000000555555",
  "certificateId": "00000000-0000-0000-0000-000000000333",
  "sellerId": "00000000-0000-0000-0000-000000000001",
  "buyerId":  "00000000-0000-0000-0000-000000000003",
  "recsSold": 7,
  "recsTransactions": [
    {
      "year": 2020,
      "amount": 2
    },
    {
      "year": 2021,
      "amount": 1
    }
  ],
  "reportingStart": "2020-11-01T00:00:00.000+03:00",
  "reportingStartTimezoneOffset": 180,
  "reportingEnd": "2021-06-01T23:59:59.999+03:00",
  "reportingEndTimezoneOffset": 180,
  "filecoinNodes": [{"id": "f00002"}]
}'
