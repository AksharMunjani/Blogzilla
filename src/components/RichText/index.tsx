import { cn } from '@/lib/utils'
import React from 'react'

import { NodeTypes, serializeLexical } from './serialize'
import type { Post } from '@/payload-types'
import { SerializedTextNode } from '@payloadcms/richtext-lexical/lexical'

// Define a type for the children nodes that matches SerializedTextNode
interface ChildNode extends Omit<SerializedTextNode, 'children' | 'type'> {
  text: string
  bold?: boolean
}

type Props = {
  className?: string
  content: Record<string, Post>
  enableGutter?: boolean
  enableProse?: boolean
}

const RichText: React.FC<Props> = ({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose dark:prose-invert ': enableProse,
        },
        className,
      )}
    >
      {content &&
        typeof content === 'object' &&
        'root' in content &&
        typeof content.root === 'object' &&
        'children' in content.root &&
        serializeLexical({
          nodes: (content.root as { children: ChildNode[] }).children as NodeTypes[],
        })}
    </div>
  )
}

export default RichText
