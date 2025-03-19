import React, { Fragment, JSX } from 'react'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'

export type NodeTypes = DefaultNodeTypes

type Props = {
  nodes: NodeTypes[]
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        if (node.type === 'text') {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        if (node.type === 'horizontalrule') {
          return <hr className="col-start-2 h-0.5 mt-6 bg-gray-true-200" key={index} />
        }

        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          } else {
            if (node?.type === 'list' && node?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        switch (node.type) {
          case 'linebreak': {
            return <br className="col-start-2" key={index} />
          }
          case 'paragraph': {
            return (
              <p className="font-geist font-normal text-lg !text-gray-500 pt-5" key={index}>
                {serializedChildren}
              </p>
            )
          }
          case 'heading': {
            const Tag = node?.tag
            const firstChild = node?.children[0]

            // Check if the first child is a text node and convert it to a slug
            const headingId =
              firstChild && typeof firstChild === 'object' && 'text' in firstChild
                ? (firstChild as { text: string }).text.toLowerCase().replace(/\s+/g, '-')
                : ''

            return (
              <Tag
                className={`!text-gray-700 ${Tag === 'h1' ? 'lg:text-5xl text-4xl mt-14' : Tag === 'h2' ? 'lg:text-4xl text-3xl mt-12' : Tag === 'h3' ? 'lg:text-3xl text-2xl mt-10' : Tag === 'h4' ? 'lg:text-2xl text-xl mt-8' : ''} font-outfit font-normal`}
                id={headingId}
                key={index}
              >
                {serializedChildren}
              </Tag>
            )
          }
          case 'list': {
            const Tag = node?.tag
            return (
              <Tag
                className={`pl-6 pt-4 font-geist font-normal text-lg !text-gray-500 ${Tag === 'ul' ? 'list-disc' : Tag === 'ol' ? 'list-decimal' : ''}`}
                key={index}
              >
                {serializedChildren}
              </Tag>
            )
          }
          case 'listitem': {
            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? 'true' : 'false'}
                  className={` ${node.checked ? '' : ''}`}
                  key={index}
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              )
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              )
            }
          }
          case 'quote': {
            return (
              <blockquote
                className="!text-gray-700 lg:text-2xl text-xl font-outfit font-normal mt-6 mb-3 lg:pl-5 pl-4 border-l-2 border-yellow-600"
                key={index}
              >
                {serializedChildren}
              </blockquote>
            )
          }

          default:
            return null
        }
        // }
      })}
    </Fragment>
  )
}
