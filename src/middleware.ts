// src/middleware.ts
import { type NextRequest, type MiddlewareConfig, NextResponse } from "next/server"

const publicRoutes = [
    { path: '/login', whenAuthenticated: 'redirect' },
    { path: '/criar_conta', whenAuthenticated: 'redirect' },
    { path: '/', whenAuthenticated: 'next' },
] as const

const privateRoutesADM = [    
    '/promocoes',
    '/produtos',
    '/vendas',
    '/historico_vendas',
    '/historico_compras',
    '/fatura_despe',
] as const

const privateRoutesCliente = [
    '/carrinho',
    '/compras',
    '/conta_cliente',
] as const

const defaultRedirect = "/login"

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const authToken = req.cookies.get("Token")?.value 
    const cargoUser = req.cookies.get("cargoUser")?.value ?? null

    const publicRoute = publicRoutes.find(route => route.path === path)

    // Banido
    if (!authToken) {
        if (publicRoute) return NextResponse.next()
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = defaultRedirect
        return NextResponse.redirect(redirectUrl)
    }

    // Desbanido
    if (publicRoute?.whenAuthenticated === "redirect") {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/"
        return NextResponse.redirect(redirectUrl)
    }
  
    // Verifica se rota é de Cliente
    if (privateRoutesCliente.includes(path as any) && cargoUser !== "Cliente") {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/vendas"
        return NextResponse.redirect(redirectUrl)
    }

    // Verifica se rota é de ADM
    if (privateRoutesADM.includes(path as any) && cargoUser !== "ADM") {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/"
        return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
}
