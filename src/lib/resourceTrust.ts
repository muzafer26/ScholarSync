import type { Resource } from "@/types";

export function getResourceStatus(resource: Resource): "Active" | "Inactive" | "Needs Review" {
  const status = resource.status?.toLowerCase();

  if (status === "inactive" || status === "removed" || status === "deprecated") {
    return "Inactive";
  }

  if (status === "aging") {
    return "Needs Review";
  }

  if (status === "active" || status === "verified") {
    return "Active";
  }

  if (resource.verification?.isActive === true) {
    return "Active";
  }

  return "Needs Review";
}

export function isTrustedResource(resource: Resource): boolean {
  return resource.verified === true && getResourceStatus(resource) === "Active";
}

export function getResourceTrustLabel(resource: Resource): string {
  const status = getResourceStatus(resource);

  if (status === "Inactive") return "Inactive";
  if (status === "Needs Review") return "Needs Review";
  if (resource.pricingType === "OFFICIAL_DOCS") return "Official Documentation";
  if (resource.pricingType === "OPEN_SOURCE") return "Open Source";
  if (isTrustedResource(resource)) return "Link Verified";
  return "Free";
}
