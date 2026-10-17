import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowCircle } from "./ArrowCircle";
import type { IconName } from "./Icon";

type Tone = "primary" | "secondary" | "ghost";

interface Base {
  tone?: Tone;
  icon?: IconName;
  arrow?: "leading" | "trailing" | "none";
  children: ReactNode;
  className?: string;
  external?: boolean;
}

type LinkProps = Base & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type ButtonProps = Base & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;
export type PillButtonProps = LinkProps | ButtonProps;

const tones: Record<Tone, string> = {
  primary: "bg-raised text-text border border-border hover:border-border-strong shadow-1",
  secondary: "bg-transparent text-text border border-border-strong hover:bg-raised",
  ghost: "bg-transparent text-text hover:text-accent-text",
};

const circleTone: Record<Tone, "accent" | "tonal" | "ghost"> = { primary: "accent", secondary: "tonal", ghost: "tonal" };

/** The pill CTA with the circular arrow. A Next link for internal hrefs, an <a> for external ones (new tab), or a <button>. */
export function PillButton(props: PillButtonProps) {
  const { tone = "primary", icon, arrow = "leading", children, className, external, ...rest } = props as PillButtonProps & Record<string, unknown>;
  const classes = cn(
    "group inline-flex h-12 items-center gap-3 rounded-pill text-body font-medium transition-[background-color,border-color,transform] duration-(--dur) ease-out active:scale-[0.98]",
    arrow === "leading" ? "pl-1.5 pr-5" : arrow === "trailing" ? "pl-5 pr-1.5" : "px-5",
    tones[tone],
    className,
  );
  const circle = arrow === "none" ? null : <ArrowCircle icon={icon ?? (external ? "arrowUpRight" : "arrowRight")} tone={circleTone[tone]} />;
  const inner = (
    <>
      {arrow === "leading" && circle}
      <span>{children}</span>
      {arrow === "trailing" && circle}
    </>
  );
  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchor } = rest as { href: string } & ComponentPropsWithoutRef<"a">;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...anchor}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchor}>
        {inner}
      </Link>
    );
  }
  const button = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" className={classes} {...button}>
      {inner}
    </button>
  );
}
