//
//  NSString+LCAdditional.m
//  Test
//
//  Created by bawn on 31/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "NSString+LCAdditional.h"

@implementation NSString (LCAdditional)

- (NSString *)stringDeleteHTLineFeed{
    NSString *string = [[NSString alloc] initWithString:self];
    NSString *lineFeedString = @"\n";
    if ([self hasPrefix:lineFeedString]) {
        string = [string substringFromIndex:lineFeedString.length];
    }
    if ([self hasSuffix:lineFeedString]) {
        string = [string substringToIndex:self.length - lineFeedString.length];
    }
    return string;
}

@end
