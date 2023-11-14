/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
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
import { EmailCampaign } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
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
export default function EmailCampaignUpdateForm(props) {
  const {
    id: idProp,
    emailCampaign: emailCampaignModelProp,
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
    emailSubject: "",
    emailContent: "",
    emailSender: "",
    emailLists: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [emailSubject, setEmailSubject] = React.useState(
    initialValues.emailSubject
  );
  const [emailContent, setEmailContent] = React.useState(
    initialValues.emailContent
  );
  const [emailSender, setEmailSender] = React.useState(
    initialValues.emailSender
  );
  const [emailLists, setEmailLists] = React.useState(initialValues.emailLists);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = emailCampaignRecord
      ? { ...initialValues, ...emailCampaignRecord }
      : initialValues;
    setName(cleanValues.name);
    setEmailSubject(cleanValues.emailSubject);
    setEmailContent(cleanValues.emailContent);
    setEmailSender(cleanValues.emailSender);
    setEmailLists(cleanValues.emailLists ?? []);
    setCurrentEmailListsValue("");
    setErrors({});
  };
  const [emailCampaignRecord, setEmailCampaignRecord] = React.useState(
    emailCampaignModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(EmailCampaign, idProp)
        : emailCampaignModelProp;
      setEmailCampaignRecord(record);
    };
    queryData();
  }, [idProp, emailCampaignModelProp]);
  React.useEffect(resetStateValues, [emailCampaignRecord]);
  const [currentEmailListsValue, setCurrentEmailListsValue] =
    React.useState("");
  const emailListsRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    emailSubject: [{ type: "Required" }],
    emailContent: [{ type: "Required" }],
    emailSender: [{ type: "Required" }],
    emailLists: [{ type: "Required" }],
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
          emailSubject,
          emailContent,
          emailSender,
          emailLists,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
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
          await DataStore.save(
            EmailCampaign.copyOf(emailCampaignRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "EmailCampaignUpdateForm")}
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
              emailSubject,
              emailContent,
              emailSender,
              emailLists,
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
      <TextField
        label="Email subject"
        isRequired={true}
        isReadOnly={false}
        value={emailSubject}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              emailSubject: value,
              emailContent,
              emailSender,
              emailLists,
            };
            const result = onChange(modelFields);
            value = result?.emailSubject ?? value;
          }
          if (errors.emailSubject?.hasError) {
            runValidationTasks("emailSubject", value);
          }
          setEmailSubject(value);
        }}
        onBlur={() => runValidationTasks("emailSubject", emailSubject)}
        errorMessage={errors.emailSubject?.errorMessage}
        hasError={errors.emailSubject?.hasError}
        {...getOverrideProps(overrides, "emailSubject")}
      ></TextField>
      <TextField
        label="Email content"
        isRequired={true}
        isReadOnly={false}
        value={emailContent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              emailSubject,
              emailContent: value,
              emailSender,
              emailLists,
            };
            const result = onChange(modelFields);
            value = result?.emailContent ?? value;
          }
          if (errors.emailContent?.hasError) {
            runValidationTasks("emailContent", value);
          }
          setEmailContent(value);
        }}
        onBlur={() => runValidationTasks("emailContent", emailContent)}
        errorMessage={errors.emailContent?.errorMessage}
        hasError={errors.emailContent?.hasError}
        {...getOverrideProps(overrides, "emailContent")}
      ></TextField>
      <TextField
        label="Email sender"
        isRequired={true}
        isReadOnly={false}
        value={emailSender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              emailSubject,
              emailContent,
              emailSender: value,
              emailLists,
            };
            const result = onChange(modelFields);
            value = result?.emailSender ?? value;
          }
          if (errors.emailSender?.hasError) {
            runValidationTasks("emailSender", value);
          }
          setEmailSender(value);
        }}
        onBlur={() => runValidationTasks("emailSender", emailSender)}
        errorMessage={errors.emailSender?.errorMessage}
        hasError={errors.emailSender?.hasError}
        {...getOverrideProps(overrides, "emailSender")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              emailSubject,
              emailContent,
              emailSender,
              emailLists: values,
            };
            const result = onChange(modelFields);
            values = result?.emailLists ?? values;
          }
          setEmailLists(values);
          setCurrentEmailListsValue("");
        }}
        currentFieldValue={currentEmailListsValue}
        label={"Email lists"}
        items={emailLists}
        hasError={errors?.emailLists?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("emailLists", currentEmailListsValue)
        }
        errorMessage={errors?.emailLists?.errorMessage}
        setFieldValue={setCurrentEmailListsValue}
        inputFieldRef={emailListsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Email lists"
          isRequired={true}
          isReadOnly={false}
          value={currentEmailListsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.emailLists?.hasError) {
              runValidationTasks("emailLists", value);
            }
            setCurrentEmailListsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("emailLists", currentEmailListsValue)
          }
          errorMessage={errors.emailLists?.errorMessage}
          hasError={errors.emailLists?.hasError}
          ref={emailListsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "emailLists")}
        ></TextField>
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
          isDisabled={!(idProp || emailCampaignModelProp)}
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
              !(idProp || emailCampaignModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
