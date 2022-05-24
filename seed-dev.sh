X_API_KEY=$(grep SUPERADMIN_API_KEY .env | cut -d "=" -f2 | tr -d '"');
PORT=$(grep -e "^PORT=" .env | cut -d "=" -f2 | tr -d '"');
TOKENIZATION_PORT=$(grep -e "^TOKENIZATION_PORT=" .env | cut -d "=" -f2 | tr -d '"');

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
  "buyerId": "00000000-0000-0000-0000-000000000002",
  "country": "CN",
  "region": "BJ"
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
  "energyWh": "3000000",
  "nameplateCapacityW": 12000
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
  "energyWh": "7000000",
  "nameplateCapacityW": 400000000,
  "redemptionDate": "2020-01-01T00:00:00.000Z"
}]'

echo
echo "creating a batch"
BATCH_ID=$(curl -w "\n" -s -X 'POST' "http://localhost:$PORT/api/partners/filecoin/batch" -H "X-API-KEY: $X_API_KEY" -H 'Content-Type: application/json' |  jq -r '.id')
echo "created batch $BATCH_ID"

echo
echo "storing the redemption statement file"
FILE_ID=$(curl -w "\n" -s -X 'POST' "http://localhost:3333/api/files" -H "X-API-KEY: $X_API_KEY" -F 'file=@examples/redemption-statement.pdf;type=application/pdf' | jq -r '.id')
echo "created file $FILE_ID"

echo
echo "setting the redemption statement"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/batch/$BATCH_ID/redemption-statement" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d @- <<END;
{
    "redemptionStatementId": "$FILE_ID"
}
END

echo
echo "minting certificates on-chain"
curl -w "\n" -s -X 'POST' \
  "http://localhost:$PORT/api/partners/filecoin/batch/$BATCH_ID/mint" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "certificateIds": ["00000000-0000-0000-0000-000000000333"]
    }'

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
  "filecoinNodeId": "f00001",
  "label": "GREEN_E_ENERGY"
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
  "filecoinNodeId": "f00001",
  "contractId": "00000000-0000-0000-0000-000000666666",
  "reportingStart": "2020-01-01T00:00:00.000Z",
  "reportingEnd": "2020-12-31T23:59:59.999Z",
  "recsSoldWh": "2000000"
}]'
