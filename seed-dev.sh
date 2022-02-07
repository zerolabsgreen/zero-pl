X_API_KEY=$(grep SUPERADMIN_API_KEY .env | cut -d "=" -f2 | tr -d '"');
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
echo "creating certificates"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/certificates" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '[{
  "id": "00000000-0000-0000-0000-000000000333",
  "generatorName": "Solar 1 - Non Bua Lampon",
  "generatorId": "NA",
  "initialSellerId": "00000000-0000-0000-0000-000000000001",
  "region": "north_china",
  "country": "CN",
  "energySource": "WIND",
  "productType": "IREC",
  "generationStart": "2020-11-01T00:00:00.000Z",
  "generationEnd": "2021-06-01T23:59:59.999Z",
  "energy": "3000000",
  "capacity": 12000
},{
  "id": "00000000-0000-0000-0000-000000000777",
  "generatorName": "Solar 1 - Non Bua Lampon",
  "generatorId": "NA",
  "initialSellerId": "00000000-0000-0000-0000-000000000001",
  "region": "north_china",
  "country": "CN",
  "energySource": "WIND",
  "productType": "IREC",
  "generationStart": "2021-06-02T00:00:00.000Z",
  "generationEnd": "2021-06-30T23:59:59.999Z",
  "energy": "7000000",
  "capacity": 400000000
}]'

echo
echo "creating a contract"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/contracts" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '[{
  "id": "00000000-0000-0000-0000-000000666666",
  "productType": "IREC",
  "energySources": [
    "SOLAR",
    "WIND"
  ],
  "region": "EU",
  "countries": ["DE", "HR"],
  "contractDate": "2020-11-01T00:00:00.000Z",
  "deliveryDate": "2021-06-01T23:59:59.999Z",
  "reportingStart": "2020-11-01T00:00:00.000Z",
  "reportingEnd": "2021-06-01T23:59:59.999Z",
  "timezoneOffset": 180,
  "volume": "4000000000000",
  "buyerId": "00000000-0000-0000-0000-000000000002",
  "sellerId": "00000000-0000-0000-0000-000000000001",
  "filecoinNodeId": "f00001"
}]'

echo
echo "creating purchases"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/purchases" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '[{
  "id": "00000000-0000-0000-0000-000000444444",
  "certificateId": "00000000-0000-0000-0000-000000000333",
  "sellerId": "00000000-0000-0000-0000-000000000001",
  "buyerId":  "00000000-0000-0000-0000-000000000002",
  "filecoinNodes": [{"id": "f00001"}],
  "contractId": "00000000-0000-0000-0000-000000666666"
},{
  "id": "00000000-0000-0000-0000-000000555555",
  "certificateId": "00000000-0000-0000-0000-000000000777",
  "sellerId": "00000000-0000-0000-0000-000000000001",
  "buyerId":  "00000000-0000-0000-0000-000000000003",
  "reportingStart": "2020-11-01T00:00:00.000+03:00",
  "reportingStartTimezoneOffset": 180,
  "reportingEnd": "2021-06-01T23:59:59.999+03:00",
  "reportingEndTimezoneOffset": 180,
  "filecoinNodes": [{"id": "f00002"}]
}]'
