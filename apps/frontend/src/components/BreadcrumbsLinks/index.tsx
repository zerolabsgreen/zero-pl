import { styled, useTheme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link";
import { FC } from "react";

export type BreadcrumbsRoutes = {
  name: string;
  link?: string;
}

interface BreadcrumbsLinksProps {
  items: BreadcrumbsRoutes[]
}

export const BreadcrumbsLinks: FC<BreadcrumbsLinksProps> = ({ items }) => {
  const theme = useTheme();
  return (
    <StyledBreadcrumbs>
      {items.map(item => (
        <StyledLink
          key={item.name}
          href={item.link}
          underline={item.link ? 'hover' : undefined}
          color={item.link ? 'inherit' : theme.palette.primary.light}
        >
          {`${item.name}${item.link ? ' >' : ''}`}
        </StyledLink>
      ))}
    </StyledBreadcrumbs>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding-top: 20px;
`
