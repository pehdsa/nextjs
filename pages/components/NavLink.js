import React, {Children} from "react";
import Link from "next/link";
import { withRouter } from "next/router";

export default withRouter(({router, children, as, href, ...rest}) => (
   <Link {...rest} href={href} as={as}>
      {React.cloneElement(Children.only(children), {
         className: (router.asPath === href || router.asPath === as) ? `active navlink` : `navlink`
      })}
   </Link>
));