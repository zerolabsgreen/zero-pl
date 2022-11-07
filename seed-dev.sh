X_API_KEY=$(grep SUPERADMIN_API_KEY .env | cut -d "=" -f2 | tr -d '"');
PORT=$(grep -e "^PORT=" .env | cut -d "=" -f2 | tr -d '"');
TOKENIZATION_PORT=$(grep -e "^TOKENIZATION_PORT=" .env | cut -d "=" -f2 | tr -d '"');
TX_WAIT_TIME=5
SEED_URL=http://localhost:$PORT

echo
echo "creating sellerId=00000000-0000-0000-0000-000000000001"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/sellers" \
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
  "$SEED_URL/api/partners/filecoin/buyers" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "00000000-0000-0000-0000-000000000002",
  "name": "-"
}'

echo
echo "creating buyerId=00000000-0000-0000-0000-000000000003"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/buyers" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "00000000-0000-0000-0000-000000000003",
  "name": "-"
}'

echo
echo "creating nodeId=f00001 for buyerId=00000000-0000-0000-0000-000000000002"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/nodes" \
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
  "$SEED_URL/api/partners/filecoin/nodes" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "f00002",
  "buyerId": "00000000-0000-0000-0000-000000000003"
}'

echo
echo "creating certificates"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/certificates" \
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
echo "generating a batch ID"
BATCH_ID=$(curl -w "\n" -s -X 'GET' "http://localhost:$TOKENIZATION_PORT/api/batch/id/generate" -H "X-API-KEY: $X_API_KEY" -H 'Content-Type: application/json')
echo "batch ID: $BATCH_ID"

echo
echo "creating a batch off-chain"
curl -w "\n" -s -X 'POST' "$SEED_URL/api/partners/filecoin/batch/$BATCH_ID" -H "X-API-KEY: $X_API_KEY" -H 'Content-Type: application/json'
echo "created off-chain batch: $BATCH_ID"

echo
echo "setting the redemption statement"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/batch/$BATCH_ID/redemption-statement" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d @- <<END;
{
    "redemptionStatementId": "bafkreigxldrh3lo2spyg424ga4r7srss4f4umm3v7njljod7qvyjtvlg7e",
    "totalVolume": "3000000"
}
END

echo
echo "waiting $TX_WAIT_TIME seconds for redemption statement to be mined..."
sleep $TX_WAIT_TIME

echo
echo "minting certificates on-chain"
MINT_TX_HASH=$(curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/batch/$BATCH_ID/mint" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "certificateIds": ["00000000-0000-0000-0000-000000000333"]
    }')
echo "Triggered the minting transaction $MINT_TX_HASH"

echo
echo "waiting $TX_WAIT_TIME seconds for the minting transaction to be mined $MINT_TX_HASH..."
sleep $TX_WAIT_TIME

echo
echo "detecting and attaching minted certificates"
curl -w "\n" -s -X 'PATCH' \
  "$SEED_URL/api/partners/filecoin/batch/attach/$MINT_TX_HASH" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json'
echo "Successfully attached certificates for $MINT_TX_HASH"

echo
echo "creating a contract"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/contracts" \
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
echo "deploying the contract on-chain"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/contracts/on-chain/deploy" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '["00000000-0000-0000-0000-000000666666"]'

echo
echo "waiting $TX_WAIT_TIME seconds for the on-chain deployment transaction to be mined..."
sleep $TX_WAIT_TIME

echo
echo "signing the on-chain contract"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/contracts/on-chain/sign" \
  -H "X-API-KEY: $X_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '["00000000-0000-0000-0000-000000666666"]'

echo
echo "waiting $TX_WAIT_TIME seconds for the on-chain signing transaction to be mined..."
sleep $TX_WAIT_TIME

echo
echo "creating purchases"
curl -w "\n" -s -X 'POST' \
  "$SEED_URL/api/partners/filecoin/purchases" \
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
