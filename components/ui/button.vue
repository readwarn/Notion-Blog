<template>
  <button
    :class="buttonVariants({ variant, size })"
    :disabled="loading || disabled"
  >
    <slot name="loader" v-if="loading">
      <div class="flex gap-x-2 items-center">
        <Loader class="size-4 animate-spin" />
        <span v-if="size != 'icon' && !hide_loading_text">Please wait...</span>
      </div>
    </slot>
    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
import { Loader } from "lucide-vue-next";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants>;

withDefaults(
  defineProps<{
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    loading?: boolean;
    disabled?: boolean;
    hide_loading_text?: boolean;
  }>(),
  {
    variant: "default",
    size: "default",
    loading: false,
    disabled: false,
    hide_loading_text: false,
  }
);
</script>
