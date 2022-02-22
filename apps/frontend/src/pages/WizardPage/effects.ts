/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CreateOrderDto, PaymentPreferencesEnumType, ProtocolTypeEnumType, useOrdersControllerCreate, UserTypeEnumType } from "@energyweb/zero-protocol-labs-api-client"
import { useState } from "react";
import { BigNumber } from '@ethersproject/bignumber';
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router";
import { Countries } from "@energyweb/utils-general";
import { useAddressMappingState, useSelectedProtocolStore } from "../../context";
import { useFormik } from "formik";

export interface WizardFormValues {
  userType: UserTypeEnumType | null;
  wirePayment: boolean;
  cryptoPayment: boolean;
  emailAddress: string;
  [key: string]: any;
}

export const initialValues: WizardFormValues = {
  userType: null,
  wirePayment: false,
  cryptoPayment: false,
  emailAddress: ''
}

export const useWizardPageEffects = () => {
  const navigate = useNavigate();
  const selectedProtocol = useSelectedProtocolStore();
  // bad needs to be replaced by more generic solution
  const isFilecoin = selectedProtocol === ProtocolTypeEnumType.FILECOIN;
  const stepLabels = ['Protocol', 'Consumption', 'Preferences', 'Confirmation'];

  const [step, setStep] = useState(0);
  const isLastStep = step === stepLabels.length - 1;

  const { mutate, isLoading } = useOrdersControllerCreate({ mutation: {
    onSuccess: () => {
      navigate('/wizard/thank-you')
    }
  }});

  const handleBackStep = () =>{
    if(step === 0){
      navigate('/')
    }
    else {
      setStep((s) => s - 1)
    };
  }

  const addressMapping = useAddressMappingState();

  const submitHandler = async (values: WizardFormValues) => {
    if (isLastStep) {
      const mappingArrIterator = Array.from(Array(addressMapping?.size).keys());
      const preparedValues: CreateOrderDto = {
        // way too hacky, should be simplified
        protocolType: selectedProtocol ?? ProtocolTypeEnumType.BITCOIN,
        userType: values.userType ?? UserTypeEnumType.OTHER,
        paymentPreferences:
        values.wirePayment && values.cryptoPayment
          ? [PaymentPreferencesEnumType.WIRE_TRANSFER, PaymentPreferencesEnumType.CRYPTO]
          : values.wirePayment
            ? [PaymentPreferencesEnumType.WIRE_TRANSFER]
            : values.cryptoPayment
              ? [PaymentPreferencesEnumType.CRYPTO]
              : [],
        emailAddress: values.emailAddress,
        items: mappingArrIterator.map(key => {
          return {
            country: Countries.find(country => country.name === values[`country_${key}`])?.code || '',
            minerId: values[`minerId_${key}`] || '',
            // @ts-ignore
            // for some reason throws an error that mapping can be null even though
            // it is null checked
            timeFrames: addressMapping.get(key) ? addressMapping.get(key).map(nestedId => ({
              start: (values[`startDate_${key}_${nestedId}`] as Dayjs).startOf('day').toISOString(),
              end: (values[`endDate_${key}_${nestedId}`] as Dayjs).endOf('day').toISOString(),
              energyWh: BigNumber.from(values[`energy_${key}_${nestedId}`]).mul(BigNumber.from(10).pow(6)).toNumber()
            })) : []
          }
        })
      }
      mutate({ data: preparedValues })
    } else {
      setStep((s) => s + 1);
    }
  };

  const formik = useFormik({ initialValues, onSubmit: submitHandler });
  const submitButtonEnabled = step === 0
    ? !!selectedProtocol
    : step === 1
      ? formik.values.userType && addressMapping && addressMapping.size > 0
      : step === 2
        ? formik.values.emailAddress && (formik.values.cryptoPayment || formik.values.wirePayment)
        : true;

  return {
    addressMapping,
    formik,
    handleBackStep,
    isFilecoin,
    isLoading,
    step,
    stepLabels,
    isLastStep,
    selectedProtocol,
    submitButtonEnabled
  }
}
