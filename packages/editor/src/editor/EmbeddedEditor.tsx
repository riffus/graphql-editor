import React, { useEffect } from "react";
import { useErrorsState, useTheme, useTreesState } from "@/state/containers";
import { EditorTheme } from "@/gshared/theme/MainTheme";
import styled from "@emotion/styled";
import { ErrorsList } from "@/shared/errors/ErrorsList";
import { PassedSchema } from "@/Models";
import { NodeNavigation } from "@/shared/NodeNavigation";
import { Relation } from "@/Relation/Relation";

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;

  scrollbar-color: ${({ theme }) =>
    `${theme.neutral[500]} ${theme.neutral[600]}`};
  *::-webkit-scrollbar {
    background: ${({ theme }) => theme.neutral[500]};
  }
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.neutral[500]};
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.neutral[600]};
  }

  .full-screen-container {
    flex: 1;
    align-self: stretch;
    height: 100%;
  }
`;

const ErrorOuterContainer = styled.div<{ isOverflow?: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  overflow-y: ${({ isOverflow }) => isOverflow && "auto"};
  overflow-x: hidden;
`;

export interface EmbeddedEditorProps {
  schema: PassedSchema;
  theme?: EditorTheme;
}

export const EmbeddedEditor = ({ schema, theme }: EmbeddedEditorProps) => {
  const { setTheme } = useTheme();
  const { generateTreeFromSchema } = useTreesState();
  const { codeErrors, errorsItems } = useErrorsState();

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (schema.source === "tree") {
      return;
    }
    generateTreeFromSchema(schema);
  }, [schema]);

  return (
    <Main
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <ErrorOuterContainer>
        <Relation
          setInitialSchema={(s) => {
            //noop
          }}
        />
        <NodeNavigation />
      </ErrorOuterContainer>
      {!!codeErrors.length && <ErrorsList>{errorsItems}</ErrorsList>}
    </Main>
  );
};
