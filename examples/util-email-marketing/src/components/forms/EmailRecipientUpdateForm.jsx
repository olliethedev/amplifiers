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
  EmailRecipient,
  EmailList,
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
export default function EmailRecipientUpdateForm(props) {
  const {
    email: emailProp,
    emailRecipient: emailRecipientModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    email: "",
    emailLists: [],
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [emailLists, setEmailLists] = React.useState(initialValues.emailLists);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = emailRecipientRecord
      ? {
          ...initialValues,
          ...emailRecipientRecord,
          emailLists: linkedEmailLists,
        }
      : initialValues;
    setEmail(cleanValues.email);
    setEmailLists(cleanValues.emailLists ?? []);
    setCurrentEmailListsValue(undefined);
    setCurrentEmailListsDisplayValue("");
    setErrors({});
  };
  const [emailRecipientRecord, setEmailRecipientRecord] = React.useState(
    emailRecipientModelProp
  );
  const [linkedEmailLists, setLinkedEmailLists] = React.useState([]);
  const canUnlinkEmailLists = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = emailProp
        ? await DataStore.query(EmailRecipient, emailProp)
        : emailRecipientModelProp;
      setEmailRecipientRecord(record);
      const linkedEmailLists = record
        ? await Promise.all(
            (
              await record.emailLists.toArray()
            ).map((r) => {
              return r.emailList;
            })
          )
        : [];
      setLinkedEmailLists(linkedEmailLists);
    };
    queryData();
  }, [emailProp, emailRecipientModelProp]);
  React.useEffect(resetStateValues, [emailRecipientRecord, linkedEmailLists]);
  const [currentEmailListsDisplayValue, setCurrentEmailListsDisplayValue] =
    React.useState("");
  const [currentEmailListsValue, setCurrentEmailListsValue] =
    React.useState(undefined);
  const emailListsRef = React.createRef();
  const getIDValue = {
    emailLists: (r) => JSON.stringify({ name: r?.name }),
  };
  const emailListsIdSet = new Set(
    Array.isArray(emailLists)
      ? emailLists.map((r) => getIDValue.emailLists?.(r))
      : getIDValue.emailLists?.(emailLists)
  );
  const emailListRecords = useDataStoreBinding({
    type: "collection",
    model: EmailList,
  }).items;
  const getDisplayValue = {
    emailLists: (r) => r?.name,
  };
  const validations = {
    email: [{ type: "Required" }, { type: "Email" }],
    emailLists: [
      { type: "Required", validationMessage: "EmailList is required." },
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
          email,
          emailLists,
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
          const emailListsToLinkMap = new Map();
          const emailListsToUnLinkMap = new Map();
          const emailListsMap = new Map();
          const linkedEmailListsMap = new Map();
          emailLists.forEach((r) => {
            const count = emailListsMap.get(getIDValue.emailLists?.(r));
            const newCount = count ? count + 1 : 1;
            emailListsMap.set(getIDValue.emailLists?.(r), newCount);
          });
          linkedEmailLists.forEach((r) => {
            const count = linkedEmailListsMap.get(getIDValue.emailLists?.(r));
            const newCount = count ? count + 1 : 1;
            linkedEmailListsMap.set(getIDValue.emailLists?.(r), newCount);
          });
          linkedEmailListsMap.forEach((count, id) => {
            const newCount = emailListsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                emailListsToUnLinkMap.set(id, diffCount);
              }
            } else {
              emailListsToUnLinkMap.set(id, count);
            }
          });
          emailListsMap.forEach((count, id) => {
            const originalCount = linkedEmailListsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                emailListsToLinkMap.set(id, diffCount);
              }
            } else {
              emailListsToLinkMap.set(id, count);
            }
          });
          emailListsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const emailRecipientsEmailListsRecords = await DataStore.query(
              EmailRecipientsEmailLists,
              (r) =>
                r.and((r) => {
                  return [
                    r.emailListName.eq(recordKeys.name),
                    r.emailRecipientEmail.eq(emailRecipientRecord.email),
                  ];
                })
            );
            for (let i = 0; i < count; i++) {
              promises.push(
                DataStore.delete(emailRecipientsEmailListsRecords[i])
              );
            }
          });
          emailListsToLinkMap.forEach((count, id) => {
            const emailListToLink = emailListRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                DataStore.save(
                  new EmailRecipientsEmailLists({
                    emailRecipient: emailRecipientRecord,
                    emailList: emailListToLink,
                  })
                )
              );
            }
          });
          const modelFieldsToSave = {
            email: modelFields.email,
          };
          promises.push(
            DataStore.save(
              EmailRecipient.copyOf(emailRecipientRecord, (updated) => {
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
      {...getOverrideProps(overrides, "EmailRecipientUpdateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={true}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              emailLists,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              email,
              emailLists: values,
            };
            const result = onChange(modelFields);
            values = result?.emailLists ?? values;
          }
          setEmailLists(values);
          setCurrentEmailListsValue(undefined);
          setCurrentEmailListsDisplayValue("");
        }}
        currentFieldValue={currentEmailListsValue}
        label={"Email lists"}
        items={emailLists}
        hasError={errors?.emailLists?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("emailLists", currentEmailListsValue)
        }
        errorMessage={errors?.emailLists?.errorMessage}
        getBadgeText={getDisplayValue.emailLists}
        setFieldValue={(model) => {
          setCurrentEmailListsDisplayValue(
            model ? getDisplayValue.emailLists(model) : ""
          );
          setCurrentEmailListsValue(model);
        }}
        inputFieldRef={emailListsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Email lists"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search EmailList"
          value={currentEmailListsDisplayValue}
          options={emailListRecords
            .filter((r) => !emailListsIdSet.has(getIDValue.emailLists?.(r)))
            .map((r) => ({
              id: getIDValue.emailLists?.(r),
              label: getDisplayValue.emailLists?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEmailListsValue(
              emailListRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEmailListsDisplayValue(label);
            runValidationTasks("emailLists", label);
          }}
          onClear={() => {
            setCurrentEmailListsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.emailLists?.hasError) {
              runValidationTasks("emailLists", value);
            }
            setCurrentEmailListsDisplayValue(value);
            setCurrentEmailListsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("emailLists", currentEmailListsDisplayValue)
          }
          errorMessage={errors.emailLists?.errorMessage}
          hasError={errors.emailLists?.hasError}
          ref={emailListsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "emailLists")}
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
          isDisabled={!(emailProp || emailRecipientModelProp)}
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
              !(emailProp || emailRecipientModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
