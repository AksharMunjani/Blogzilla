import type { Field } from 'payload'

import deepMerge from '@/lib/deepMerge'

export type ButtonVariants = 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link'

export type ButtonSize =
  | 'default'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'smIcon'
  | 'mdIcon'
  | 'lgIcon'
  | 'xlIcon'
  | '2xlIcon'

export const variantOptions: Record<ButtonVariants, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  destructive: {
    label: 'Destructive',
    value: 'destructive',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  ghost: {
    label: 'Ghost',
    value: 'ghost',
  },
  link: {
    label: 'Link',
    value: 'link',
  },
}

export const sizeOptions: Record<ButtonSize, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  sm: {
    label: 'Small',
    value: 'sm',
  },
  md: {
    label: 'Medium',
    value: 'md',
  },
  lg: {
    label: 'Large',
    value: 'lg',
  },
  xl: {
    label: 'XLarge',
    value: 'xl',
  },
  '2xl': {
    label: 'XXLarge',
    value: '2xl',
  },
  smIcon: {
    label: 'Small Icon',
    value: 'smIcon',
  },
  mdIcon: {
    label: 'Medium Icon',
    value: 'mdIcon',
  },
  lgIcon: {
    label: 'Large Icon',
    value: 'lgIcon',
  },
  xlIcon: {
    label: 'XLarge Icon',
    value: 'xlIcon',
  },
  '2xlIcon': {
    label: 'XXLarge Icon',
    value: '2xlIcon',
  },
}

type ButtonType = (options?: {
  variants?: ButtonVariants[] | false
  size?: ButtonSize[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const button: ButtonType = ({
  variants,
  size,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const buttonResult: Field = {
    name: 'button',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal button',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const buttonTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to button to',
      maxDepth: 1,
      relationTo: ['posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    buttonTypes.map((buttonType) => ({
      ...buttonType,
      admin: {
        ...buttonType.admin,
        width: '50%',
      },
    }))

    buttonResult.fields.push({
      type: 'row',
      fields: [
        ...buttonTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    buttonResult.fields = [...buttonResult.fields, ...buttonTypes]
  }

  if (variants !== false) {
    let variantOptionsToUse = [
      variantOptions.default,
      variantOptions.outline,
      variantOptions.destructive,
      variantOptions.secondary,
      variantOptions.ghost,
      variantOptions.link,
    ]

    if (variants) {
      variantOptionsToUse = variants.map((variant) => variantOptions[variant])
    }

    buttonResult.fields.push({
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: variantOptionsToUse,
    })
  }

  if (size !== false) {
    let sizeOptionsToUse = [
      sizeOptions.default,
      sizeOptions.sm,
      sizeOptions.md,
      sizeOptions.lg,
      sizeOptions.xl,
      sizeOptions['2xl'],
      sizeOptions.smIcon,
      sizeOptions.mdIcon,
      sizeOptions.lgIcon,
      sizeOptions.xlIcon,
      sizeOptions['2xlIcon'],
    ]

    if (size) {
      sizeOptionsToUse = size.map((size) => sizeOptions[size])
    }

    buttonResult.fields.push({
      name: 'size',
      type: 'select',
      defaultValue: 'default',
      options: sizeOptionsToUse,
    })
  }

  return deepMerge(buttonResult, overrides)
}
