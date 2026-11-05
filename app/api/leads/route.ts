const requiredFields = ["name", "business", "businessType", "phone", "problem", "preferredContact"] as const;
const formSubmitUrl = "https://formsubmit.co/ajax/rakesclicks@gmail.com";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "Please check the form details and try again." }, { status: 400 });
    }
    payload = body as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Please check the form details and try again." }, { status: 400 });
  }

  const values: Record<string, string> = {};
  for (const field of requiredFields) {
    const value = payload[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      return Response.json({ error: "Please complete every field before submitting." }, { status: 400 });
    }
    values[field] = value.trim().slice(0, field === "problem" ? 3000 : 250);
  }

  const referer = request.headers.get("referer") ?? new URL("/", request.url).toString();
  const origin = request.headers.get("origin") ?? new URL(referer).origin;

  try {
    const response = await fetch(formSubmitUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: origin,
        Referer: referer,
      },
      body: JSON.stringify({
        ...values,
        _subject: "New website consultation request",
        _template: "table",
        _url: referer,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    const result: unknown = await response.json().catch(() => null);
    const accepted = Boolean(
      result &&
        typeof result === "object" &&
        "success" in result &&
        (result.success === true || result.success === "true"),
    );

    if (response.ok && accepted) return Response.json({ ok: true });

    const providerMessage =
      result && typeof result === "object" && "message" in result && typeof result.message === "string"
        ? result.message.slice(0, 240)
        : null;
    console.error("FormSubmit rejected a lead submission:", { status: response.status, message: providerMessage });

    return Response.json(
      { error: providerMessage ? `FormSubmit: ${providerMessage}` : "FormSubmit couldn't accept the request. Please try again shortly." },
      { status: 502 },
    );
  } catch (error) {
    console.error("Unable to contact FormSubmit:", error instanceof Error ? error.message : "Unknown error");
    return Response.json(
      { error: "We couldn't reach the form email service. Please try again shortly." },
      { status: 502 },
    );
  }
}
