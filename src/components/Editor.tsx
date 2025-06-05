import List from "@editorjs/list";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import Image from "@editorjs/image";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";

import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

import config from "../config";
import { RootState } from "../app/store";


export interface EditorRef {
  save: () => Promise<OutputData>;
}

interface EditorProps {
  readOnly: boolean;
  data?: any;
}

const Editor = forwardRef<EditorRef, EditorProps>(({readOnly, data}, ref) => {
  const editorInstance = useRef<EditorJS | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token)


  useEffect(() => {
    const defaultData = {
      blocks: [
        {
          type: 'header',
          data: {
            level: 3,
            text: t("first_header")
          }
        },
        {
          type: 'header',
          data: {
            level: 5,
            text: t("second_header")
          }
        }
      ]
    };

    const editorData = data ? {"blocks": data} : defaultData;

    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: editorRef.current as HTMLElement,
        readOnly: readOnly,
        data: editorData,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: t("heading_placeholder"),
              defaultLevel: 4,
              levels: [3, 4, 5, 6]
            }
          },
          table: Table,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true
              }
            }
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: `${config.apiBasePath}/api/uploadImage`,
                byUrl: `${config.apiBasePath}/api/fetch`,
              },
              additionalRequestHeaders: {
                Authorization: `Bearer ${token}`,
              },
              field: "file",
              types: 'image/png, image/jpeg, image/webp',
            }
          },
        },
        placeholder: t("default_placeholder"),
      });
    }

    return () => {
      editorInstance.current?.destroy();
      editorInstance.current = null;
    };
  }, [t]);

  useImperativeHandle(ref, () => ({
    async save() {
      if (!editorInstance.current) return { blocks: [] };
      return await editorInstance.current.save();
    },
  }));

  return <div ref={editorRef} className="p-4" style={{ height: "auto", minHeight: "100px" }}></div>;
});

export default memo(Editor);
