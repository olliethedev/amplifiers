/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  EmailList,
  EmailCampaign,
  EmailRecipient,
  EmailListsEmailCampaigns,
  EmailRecipientsEmailLists,
} from "../../models";
import {
  fetchByPath,
  getOverrideProps,
  useDataStoreBinding,
  validateField,
} from "./utils";
import { DataStore } from "aws-amplify/datastore";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function EmailListCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    emailCampaigns: [],
    emailRecipients: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [emailCampaigns, setEmailCampaigns] = React.useState(
    initialValues.emailCampaigns
  );
  const [emailRecipients, setEmailRecipients] = React.useState(
    initialValues.emailRecipients
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setEmailCampaigns(initialValues.emailCampaigns);
    setCurrentEmailCampaignsValue(undefined);
    setCurrentEmailCampaignsDisplayValue("");
    setEmailRecipients(initialValues.emailRecipients);
    setCurrentEmailRecipientsValue(undefined);
    setCurrentEmailRecipientsDisplayValue("");
    setErrors({});
  };
  const [
    currentEmailCampaignsDisplayValue,
    setCurrentEmailCampaignsDisplayValue,
  ] = React.useState("");
  const [currentEmailCampaignsValue, setCurrentEmailCampaignsValue] =
    React.useState(undefined);
  const emailCampaignsRef = React.createRef();
  const [
    currentEmailRecipientsDisplayValue,
    setCurrentEmailRecipientsDisplayValue,
  ] = React.useState("");
  const [currentEmailRecipientsValue, setCurrentEmailRecipientsValue] =
    React.useState(undefined);
  const emailRecipientsRef = React.createRef();
  const getIDValue = {
    emailCampaigns: (r) => JSON.stringify({ id: r?.id }),
    emailRecipients: (r) => JSON.stringify({ email: r?.email }),
  };
  const emailCampaignsIdSet = new Set(
    Array.isArray(emailCampaigns)
      ? emailCampaigns.map((r) => getIDValue.emailCampaigns?.(r))
      : getIDValue.emailCampaigns?.(emailCampaigns)
  );
  const emailRecipientsIdSet = new Set(
    Array.isArray(emailRecipients)
      ? emailRecipients.map((r) => getIDValue.emailRecipients?.(r))
      : getIDValue.emailRecipients?.(emailRecipients)
  );
  const emailCampaignRecords = useDataStoreBinding({
    type: "collection",
    model: EmailCampaign,
  }).items;
  const emailRecipientRecords = useDataStoreBinding({
    type: "collection",
    model: EmailRecipient,
  }).items;
  const getDisplayValue = {
    emailCampaigns: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    emailRecipients: (r) => r?.email,
  };
  const validations = {
    name: [{ type: "Required" }],
    emailCampaigns: [
      { type: "Required", validationMessage: "EmailCampaign is required." },
    ],
    emailRecipients: [
      { type: "Required", validationMessage: "EmailRecipient is required." },
    ],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          emailCampaigns,
          emailRecipients,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name,
          };
          const emailList = await DataStore.save(
            new EmailList(modelFieldsToSave)
          );
          const promises = [];
          promises.push(
            ...emailCampaigns.reduce((promises, emailCampaign) => {
              promises.push(
                DataStore.save(
                  new EmailListsEmailCampaigns({
                    emailList,
                    emailCampaign,
                  })
                )
              );
              return promises;
            }, [])
          );
          promises.push(
            ...emailRecipients.reduce((promises, emailRecipient) => {
              promises.push(
                DataStore.save(
                  new EmailRecipientsEmailLists({
                    emailList,
                    emailRecipient,
                  })
                )
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "EmailListCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              emailCampaigns,
              emailRecipients,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              emailCampaigns: values,
              emailRecipients,
            };
            const result = onChange(modelFields);
            values = result?.emailCampaigns ?? values;
          }
          setEmailCampaigns(values);
          setCurrentEmailCampaignsValue(undefined);
          setCurrentEmailCampaignsDisplayValue("");
        }}
        currentFieldValue={currentEmailCampaignsValue}
        label={"Email campaigns"}
        items={emailCampaigns}
        hasError={errors?.emailCampaigns?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("emailCampaigns", currentEmailCampaignsValue)
        }
        errorMessage={errors?.emailCampaigns?.errorMessage}
        getBadgeText={getDisplayValue.emailCampaigns}
        setFieldValue={(model) => {
          setCurrentEmailCampaignsDisplayValue(
            model ? getDisplayValue.emailCampaigns(model) : ""
          );
          setCurrentEmailCampaignsValue(model);
        }}
        inputFieldRef={emailCampaignsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Email campaigns"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search EmailCampaign"
          value={currentEmailCampaignsDisplayValue}
          options={emailCampaignRecords
            .filter(
              (r) => !emailCampaignsIdSet.has(getIDValue.emailCampaigns?.(r))
            )
            .map((r) => ({
              id: getIDValue.emailCampaigns?.(r),
              label: getDisplayValue.emailCampaigns?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEmailCampaignsValue(
              emailCampaignRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEmailCampaignsDisplayValue(label);
            runValidationTasks("emailCampaigns", label);
          }}
          onClear={() => {
            setCurrentEmailCampaignsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.emailCampaigns?.hasError) {
              runValidationTasks("emailCampaigns", value);
            }
            setCurrentEmailCampaignsDisplayValue(value);
            setCurrentEmailCampaignsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "emailCampaigns",
              currentEmailCampaignsDisplayValue
            )
          }
          errorMessage={errors.emailCampaigns?.errorMessage}
          hasError={errors.emailCampaigns?.hasError}
          ref={emailCampaignsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "emailCampaigns")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              emailCampaigns,
              emailRecipients: values,
            };
            const result = onChange(modelFields);
            values = result?.emailRecipients ?? values;
          }
          setEmailRecipients(values);
          setCurrentEmailRecipientsValue(undefined);
          setCurrentEmailRecipientsDisplayValue("");
        }}
        currentFieldValue={currentEmailRecipientsValue}
        label={"Email recipients"}
        items={emailRecipients}
        hasError={errors?.emailRecipients?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "emailRecipients",
            currentEmailRecipientsValue
          )
        }
        errorMessage={errors?.emailRecipients?.errorMessage}
        getBadgeText={getDisplayValue.emailRecipients}
        setFieldValue={(model) => {
          setCurrentEmailRecipientsDisplayValue(
            model ? getDisplayValue.emailRecipients(model) : ""
          );
          setCurrentEmailRecipientsValue(model);
        }}
        inputFieldRef={emailRecipientsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Email recipients"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search EmailRecipient"
          value={currentEmailRecipientsDisplayValue}
          options={emailRecipientRecords
            .filter(
              (r) => !emailRecipientsIdSet.has(getIDValue.emailRecipients?.(r))
            )
            .map((r) => ({
              id: getIDValue.emailRecipients?.(r),
              label: getDisplayValue.emailRecipients?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEmailRecipientsValue(
              emailRecipientRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEmailRecipientsDisplayValue(label);
            runValidationTasks("emailRecipients", label);
          }}
          onClear={() => {
            setCurrentEmailRecipientsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.emailRecipients?.hasError) {
              runValidationTasks("emailRecipients", value);
            }
            setCurrentEmailRecipientsDisplayValue(value);
            setCurrentEmailRecipientsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "emailRecipients",
              currentEmailRecipientsDisplayValue
            )
          }
          errorMessage={errors.emailRecipients?.errorMessage}
          hasError={errors.emailRecipients?.hasError}
          ref={emailRecipientsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "emailRecipients")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
