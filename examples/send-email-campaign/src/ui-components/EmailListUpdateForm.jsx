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
import { EmailList, EmailRecipient, EmailRecipientLists } from "../models";
import {
  fetchByPath,
  getOverrideProps,
  useDataStoreBinding,
  validateField,
} from "./utils";
import { DataStore } from "aws-amplify";
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
export default function EmailListUpdateForm(props) {
  const {
    name: nameProp,
    emailList: emailListModelProp,
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
    emailRecipients: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [emailRecipients, setEmailRecipients] = React.useState(
    initialValues.emailRecipients
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = emailListRecord
      ? {
          ...initialValues,
          ...emailListRecord,
          emailRecipients: linkedEmailRecipients,
        }
      : initialValues;
    setName(cleanValues.name);
    setEmailRecipients(cleanValues.emailRecipients ?? []);
    setCurrentEmailRecipientsValue(undefined);
    setCurrentEmailRecipientsDisplayValue("");
    setErrors({});
  };
  const [emailListRecord, setEmailListRecord] =
    React.useState(emailListModelProp);
  const [linkedEmailRecipients, setLinkedEmailRecipients] = React.useState([]);
  const canUnlinkEmailRecipients = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = nameProp
        ? await DataStore.query(EmailList, nameProp)
        : emailListModelProp;
      setEmailListRecord(record);
      const linkedEmailRecipients = record
        ? await Promise.all(
            (
              await record.emailRecipients.toArray()
            ).map((r) => {
              return r.emailRecipient;
            })
          )
        : [];
      setLinkedEmailRecipients(linkedEmailRecipients);
    };
    queryData();
  }, [nameProp, emailListModelProp]);
  React.useEffect(resetStateValues, [emailListRecord, linkedEmailRecipients]);
  const [
    currentEmailRecipientsDisplayValue,
    setCurrentEmailRecipientsDisplayValue,
  ] = React.useState("");
  const [currentEmailRecipientsValue, setCurrentEmailRecipientsValue] =
    React.useState(undefined);
  const emailRecipientsRef = React.createRef();
  const getIDValue = {
    emailRecipients: (r) => JSON.stringify({ email: r?.email }),
  };
  const emailRecipientsIdSet = new Set(
    Array.isArray(emailRecipients)
      ? emailRecipients.map((r) => getIDValue.emailRecipients?.(r))
      : getIDValue.emailRecipients?.(emailRecipients)
  );
  const emailRecipientRecords = useDataStoreBinding({
    type: "collection",
    model: EmailRecipient,
  }).items;
  const getDisplayValue = {
    emailRecipients: (r) => r?.email,
  };
  const validations = {
    name: [{ type: "Required" }],
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
          const promises = [];
          const emailRecipientsToLinkMap = new Map();
          const emailRecipientsToUnLinkMap = new Map();
          const emailRecipientsMap = new Map();
          const linkedEmailRecipientsMap = new Map();
          emailRecipients.forEach((r) => {
            const count = emailRecipientsMap.get(
              getIDValue.emailRecipients?.(r)
            );
            const newCount = count ? count + 1 : 1;
            emailRecipientsMap.set(getIDValue.emailRecipients?.(r), newCount);
          });
          linkedEmailRecipients.forEach((r) => {
            const count = linkedEmailRecipientsMap.get(
              getIDValue.emailRecipients?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedEmailRecipientsMap.set(
              getIDValue.emailRecipients?.(r),
              newCount
            );
          });
          linkedEmailRecipientsMap.forEach((count, id) => {
            const newCount = emailRecipientsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                emailRecipientsToUnLinkMap.set(id, diffCount);
              }
            } else {
              emailRecipientsToUnLinkMap.set(id, count);
            }
          });
          emailRecipientsMap.forEach((count, id) => {
            const originalCount = linkedEmailRecipientsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                emailRecipientsToLinkMap.set(id, diffCount);
              }
            } else {
              emailRecipientsToLinkMap.set(id, count);
            }
          });
          emailRecipientsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const emailRecipientListsRecords = await DataStore.query(
              EmailRecipientLists,
              (r) =>
                r.and((r) => {
                  return [
                    r.emailRecipientEmail.eq(recordKeys.email),
                    r.emailListName.eq(emailListRecord.name),
                  ];
                })
            );
            for (let i = 0; i < count; i++) {
              promises.push(DataStore.delete(emailRecipientListsRecords[i]));
            }
          });
          emailRecipientsToLinkMap.forEach((count, id) => {
            const emailRecipientToLink = emailRecipientRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                DataStore.save(
                  new EmailRecipientLists({
                    emailList: emailListRecord,
                    emailRecipient: emailRecipientToLink,
                  })
                )
              );
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name,
          };
          promises.push(
            DataStore.save(
              EmailList.copyOf(emailListRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "EmailListUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={true}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(nameProp || emailListModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(nameProp || emailListModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
