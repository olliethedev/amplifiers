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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  EmailCampaign,
  EmailList,
  EmailListsEmailCampaigns,
} from "../../models";
import {
  fetchByPath,
  getOverrideProps,
  useDataStoreBinding,
  validateField,
} from "./utils";
import { DataStore } from "aws-amplify/datastore";
import { useEmailEditor } from "../../hooks/useEmailEditor";

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
export default function EmailCampaignCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onTest,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    emailSubject: "",
    emailContent: `# Tantorum sit illas futuris protinus sed et

## Quaque increpor caput

Lorem markdownum fingit Ganymedes natis lacertis marmora **iamque sorores**,
laevaque qualis liquido. Donec nec volucris prodiga quique, recusat, sulphura et
hunc desertaque. Consenuere quoque, utere, inmixtos modo. Terga sum hospita
caespite **offert sui** quae, ad salutat esse misisset *exit capillis at*
primos.

> Lectos fera seri lupi **in aure Ultima** nostri?

- Quoque et sibi et
- Quoque et [sibi](http://www.example.com/) et

[![Foo](https://picsum.photos/id/20/500/200)](http://example.com/)

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

`,
    emailSender: "",
    draft: false,
    emailLists: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [emailSubject, setEmailSubject] = React.useState(
    initialValues.emailSubject
  );
  // const [emailContent, setEmailContent] = React.useState(
  //   initialValues.emailContent
  // );

  const {
    layout: emailEditorLayout,
    content: emailContent,
    setContent: setEmailContent,
    content: htmlContent,
    errors: emailEditorErrors,
    runAllValidationTasks: runEmailEditorValidationTasks,
  } = useEmailEditor(initialValues.emailContent);

  const [emailSender, setEmailSender] = React.useState(
    initialValues.emailSender
  );
  const [draft, setDraft] = React.useState(initialValues.draft);
  const [emailLists, setEmailLists] = React.useState(initialValues.emailLists);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setEmailSubject(initialValues.emailSubject);
    setEmailContent(initialValues.emailContent);
    setEmailSender(initialValues.emailSender);
    setDraft(initialValues.draft);
    setEmailLists(initialValues.emailLists);
    setCurrentEmailListsValue(undefined);
    setCurrentEmailListsDisplayValue("");
    setErrors({});
  };
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
    name: [{ type: "Required" }],
    emailSubject: [{ type: "Required" }],
    emailContent: [{ type: "Required" }],
    emailSender: [{ type: "Required" }],
    draft: [{ type: "Required" }],
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
    setErrors((errors) => ({
      ...errors,
      [fieldName]: validationResponse,
      ...emailEditorErrors,
    }));
    return validationResponse;
  };

  const handleValidation = async () => {
    let modelFields = {
      name,
      emailSubject,
      emailContent,
      emailSender,
      draft,
      emailLists,
    };
    const validationResponses = await Promise.all(
      Object.keys(validations).reduce((promises, fieldName) => {
        if (Array.isArray(modelFields[fieldName])) {
          promises.push(
            ...modelFields[fieldName].map((item) =>
              runValidationTasks(fieldName, item, getDisplayValue[fieldName])
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
    const emailEditorValidationResponses =
      await runEmailEditorValidationTasks();
    console.log(validationResponses);
    console.log(emailEditorValidationResponses);
    if (
      validationResponses.some((r) => r.hasError) ||
      emailEditorValidationResponses.some((r) => r.hasError)
    ) {
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

      modelFields.emailContent = htmlContent; // replaced with html content to include full template. since we passed runEmailEditorValidationTasks, we know it's valid

      const modelFieldsToSave = {
        name: modelFields.name,
        emailSubject: modelFields.emailSubject,
        emailContent: modelFields.emailContent,
        emailSender: modelFields.emailSender,
        draft: modelFields.draft,
      };

      console.log(modelFieldsToSave);

      return {modelFieldsToSave, modelFields};
    } catch (err) {
      if (onError) {
        onError(modelFields, err.message);
      }
    }
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();

        try {
          const {modelFieldsToSave, modelFields} = await handleValidation();

          throw new Error("testing end");
          const emailCampaign = await DataStore.save(
            new EmailCampaign(modelFieldsToSave)
          );
          const promises = [];
          promises.push(
            ...emailLists.reduce((promises, emailList) => {
              promises.push(
                DataStore.save(
                  new EmailListsEmailCampaigns({
                    emailCampaign,
                    emailList,
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
      {...getOverrideProps(overrides, "EmailCampaignCreateForm")}
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
              draft,
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
              draft,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              emailSubject,
              emailContent,
              emailSender,
              draft,
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

      {/* <Flex>
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
              draft,
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

      
      </Flex> */}

      {emailEditorLayout}

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
              draft,
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
      <SwitchField
        label="Draft"
        defaultChecked={false}
        isDisabled={false}
        isChecked={draft}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              emailSubject,
              emailContent,
              emailSender,
              draft: value,
              emailLists,
            };
            const result = onChange(modelFields);
            value = result?.draft ?? value;
          }
          if (errors.draft?.hasError) {
            runValidationTasks("draft", value);
          }
          setDraft(value);
        }}
        onBlur={() => runValidationTasks("draft", draft)}
        errorMessage={errors.draft?.errorMessage}
        hasError={errors.draft?.hasError}
        {...getOverrideProps(overrides, "draft")}
      ></SwitchField>
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
        <Button
            children="Test"
            type="test"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            onClick={async (event) => {
              event.preventDefault();
              const { modelFields} = await handleValidation();
              onTest && onTest(modelFields);
            }}
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
