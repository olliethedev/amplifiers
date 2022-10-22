import React, { useCallback, useState } from "react";
import embed from "embed-video";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateFromMarkdown } from "draft-js-import-markdown";
import { stateToMarkdown } from "draft-js-export-markdown";
// import { uploadFileToBucket } from "../utils/FileHelper";
// import { ImageTask, ImageTaskStatus, ImageTaskType } from "../models";
import { Logger } from "@aws-amplify/core";
// import { DataStore } from "@aws-amplify/datastore";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const logger = new Logger("RichTextEditor");

export interface RichTextEditorProps {
  readOnly?: boolean;
  initialMarkdown?: string;
  onChange?: (markdown: string) => void;
}

const RichTextEditor = ({
  initialMarkdown,
  onChange,
  readOnly = false,
}: React.PropsWithoutRef<RichTextEditorProps>) => {
  const initialState = initialMarkdown
    ? EditorState.createWithContent(
        stateFromMarkdown(initialMarkdown, {
          parserOptions: { atomicImages: true },
        })
      )
    : EditorState.createEmpty();
  logger.info({ initialState });
  const [editorState, setEditorState] = useState(initialState);
  const onEditorStateChange = useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
      onChange?.(stateToMarkdown(editorState.getCurrentContent()));
    },
    [onChange]
  );
  return (
    <div className="rdw-root">
      <Editor
        readOnly={readOnly}
        toolbarHidden={readOnly}
        toolbar={{
          options: [
            "history",
            "blockType",
            "fontSize",
            "inline",
            "list",
            "textAlign",
            "link",
            "embedded",
            "image",
            "remove",
          ],
          fontSize: {
            inDropdown: true,
            options: [11, 14, 16, 18, 24, 30],
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3", "H4"],
          },
          list: { inDropdown: true },
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline"],
          },
          textAlign: { inDropdown: true },
          link: {
            inDropdown: true,
            linkCallback: (params: any[]) => ({ ...params }),
          },
          image: {
            // uploadCallback: uploadImageCallBack,
            previewImage: true,
          },
          embedded: {
            embedCallback: (link: any) => {
              const detectedSrc = /<iframe.*? src="(.*?)"/.exec(embed(link));
              return (detectedSrc && detectedSrc[1]) || link;
            },
          },
        }}
        editorState={editorState}
        toolbarClassName="rdw-toolbar"
        wrapperClassName="rdw-wrapper"
        editorClassName="rdw-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

// async function uploadImageCallBack(file: File) {
//   const url = await uploadFileToBucket(
//     file,
//     "content",
//     "protected",
//     "public-read"
//   );
//   const resizeTask = new ImageTask({
//     type: ImageTaskType.RESIZE,
//     status: ImageTaskStatus.NEW,
//     url,
//   });
//   logger.info({ resizeTask });
//   const status = await DataStore.save(resizeTask);
//   logger.info({ status });
//   const resizeTaskResult = await watchResizeTask(resizeTask);
//   return {
//     data: {
//       link: resizeTaskResult.url?.replace(
//         "/original/",
//         resizeTaskResult.status === ImageTaskStatus.FINISHED
//           ? "/large/"
//           : "/original/"
//       ),
//     },
//   };
// }

export default RichTextEditor;

// const watchResizeTask = (resizeTask: ImageTask) => {
//   return new Promise<ImageTask>((resolve, reject) => {
//     DataStore.observe(resizeTask).subscribe(
//       (snapshot) => {
//         logger.info({ snapshot });
//         if (snapshot.element.status !== ImageTaskStatus.NEW) {
//           resolve(snapshot.element);
//         }
//       },
//       (error) => {
//         reject(false);
//         logger.error({ error });
//       }
//     );
//   });
// };
